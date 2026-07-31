import prisma from "../lib/prisma.js";
import { getIO } from "../socket/socket.js";

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

    const chatsWithUnreadCount = await Promise.all(
      chats.map(async (chat) => {
        const unreadCount = await prisma.message.count({
          where: {
            chatId: chat.id,
            senderId: {
              not: req.user.id,
            },
            status: "SENT",
          },
        });

        return {
          ...chat,
          unreadCount,
        };
      }),
    );

    return res.status(200).json({
      success: true,
      data: {
        chats: chatsWithUnreadCount,
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

export const getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    // Check whether the logged-in user belongs to this chat
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        participants: {
          some: {
            userId: req.user.id,
          },
        },
      },
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found.",
      });
    }

    const messages = await prisma.message.findMany({
      where: {
        chatId,
      },
      include: {
        sender: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profilePicture: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json({
      success: true,
      data: {
        messages,
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

export const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message content is required.",
      });
    }

    // Verify the chat exists and the user belongs to it
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        participants: {
          some: {
            userId: req.user.id,
          },
        },
      },
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found.",
      });
    }

    const message = await prisma.message.create({
      data: {
        content: content.trim(),
        senderId: req.user.id,
        chatId,
      },
      include: {
        sender: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profilePicture: true,
          },
        },
      },
    });

    const io = getIO();

    io.to(chatId).emit("receive-message", message);
    console.log("Message emitted:", message.id);

    // Move this chat to the top of the conversation list
    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: {
        message,
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

export const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        participants: true,
      },
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found.",
      });
    }

    if (chat.isGroup) {
      return res.status(400).json({
        success: false,
        message: "Use the group delete endpoint for groups.",
      });
    }

    const isParticipant = chat.participants.some(
      (participant) => participant.userId === req.user.id,
    );

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: "You are not a participant of this chat.",
      });
    }

    await prisma.chat.delete({
      where: {
        id: chatId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Chat deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
