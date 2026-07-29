import prisma from "../lib/prisma.js";

export const createChat = async (req, res) => {
  try {
    const { userId } = req.body;
    const currentUserId = req.user.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    if (userId === currentUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot create a chat with yourself.",
      });
    }

    // Make sure the other user exists
    const targetUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Find all private chats of the logged-in user
    const existingChats = await prisma.chat.findMany({
      where: {
        isGroup: false,
        participants: {
          some: {
            userId: currentUserId,
          },
        },
      },
      include: {
        participants: true,
      },
    });

    // Check whether the target user is also a participant
    const existingChat = existingChats.find((chat) => {
      const participantIds = chat.participants.map((p) => p.userId);

      return (
        participantIds.length === 2 &&
        participantIds.includes(currentUserId) &&
        participantIds.includes(userId)
      );
    });

    if (existingChat) {
      return res.status(200).json({
        success: true,
        message: "Chat already exists.",
        data: {
          chat: existingChat,
        },
      });
    }

    // Create a new chat
    const chat = await prisma.chat.create({
      data: {
        isGroup: false,
        participants: {
          create: [
            {
              userId: currentUserId,
            },
            {
              userId,
            },
          ],
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
      message: "Chat created successfully.",
      data: {
        chat,
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



export const getChats = async (req, res) => {
  try {
    const chats = await prisma.chat.findMany({
      where: {
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
                email: true,
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
        chats,
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

export const getOneToOneChats = async (req, res) => {
  try {
    const chats = await prisma.chat.findMany({
      where: {
        isGroup: false,
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
                email: true,
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
        chats,
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
