import prisma from "../lib/prisma.js";

export const createGroup = async (req, res) => {
  try {
    const { groupName, memberIds } = req.body;
    const currentUserId = req.user.id;

    if (!groupName || !groupName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Group name is required.",
      });
    }

    if (!Array.isArray(memberIds) || memberIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one member is required.",
      });
    }

    // Remove duplicates
    const uniqueMemberIds = [...new Set(memberIds)];

    // Add creator if missing
    if (!uniqueMemberIds.includes(currentUserId)) {
      uniqueMemberIds.push(currentUserId);
    }

    // Verify all users exist
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: uniqueMemberIds,
        },
      },
    });

    if (users.length !== uniqueMemberIds.length) {
      return res.status(404).json({
        success: false,
        message: "One or more users were not found.",
      });
    }

    const group = await prisma.chat.create({
      data: {
        isGroup: true,
        groupName: groupName.trim(),
        participants: {
          create: uniqueMemberIds.map((id) => ({
            userId: id,
          })),
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                email: true,
                profilePicture: true,
              },
            },
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Group created successfully.",
      data: {
        group,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};





export const getGroups = async (req, res) => {
  try {
    const groups = await prisma.chat.findMany({
      where: {
        isGroup: true,
        participants: {
          some: {
            userId: req.user.id,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                profilePicture: true,
              },
            },
          },
        },
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      data: {
        groups,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};