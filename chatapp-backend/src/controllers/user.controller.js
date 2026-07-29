import prisma from "../lib/prisma.js";
import fs from "fs";
import path from "path";

export const changeUsername = async (req, res) => {
  try {
    const { fullName } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Username is required.",
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        fullName: fullName.trim(),
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        profilePicture: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Username updated successfully.",
      data: {
        user: updatedUser,
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




export const changeProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (
      user.profilePicture &&
      user.profilePicture.startsWith("/uploads/")
    ) {
      const oldImagePath = path.join(
        process.cwd(),
        "public",
        user.profilePicture.replace(/^\/+/, "")
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const imagePath = `/uploads/profile-pictures/${req.file.filename}`;

    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        profilePicture: imagePath,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        profilePicture: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully.",
      data: {
        user: updatedUser,
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



export const searchUser = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query is required.",
      });
    }

    const user = await prisma.user.findMany({
  where: {
  NOT: {
    id: req.user.id,
  },
  OR: [
    {
      email: {
        contains: query.trim().toLowerCase(),
        mode: "insensitive",
      },
    },
    {
      fullName: {
        contains: query.trim(),
        mode: "insensitive",
      },
    },
  ],
},
  select: {
    id: true,
    fullName: true,
    email: true,
    profilePicture: true,
  },
});

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.length === 0) {
  return res.status(404).json({
    success: false,
    message: "User not found.",
  });
}

    if (user.id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot search for yourself.",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        user,
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