import { Server } from "socket.io";
import prisma from "../lib/prisma.js";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join a chat room
    socket.on("join-chat", (chatId) => {
      socket.join(chatId);
      console.log(`${socket.id} joined chat ${chatId}`);
    });

    // Leave a chat room
    socket.on("leave-chat", (chatId) => {
      socket.leave(chatId);
      console.log(`${socket.id} left chat ${chatId}`);
    });

    // User started typing
    socket.on("typing", ({ chatId, userId, fullName }) => {
      socket.to(chatId).emit("user-typing", {
        chatId,
        userId,
        fullName,
      });
    });

    // User stopped typing
    socket.on("stop-typing", ({ chatId, userId }) => {
      socket.to(chatId).emit("user-stop-typing", {
        chatId,
        userId,
      });
    });

    // Mark messages as read
    socket.on("mark-read", async ({ chatId, userId }) => {
      try {
        console.log("📥 mark-read received", {
          chatId,
          userId,
        });

        const result = await prisma.message.updateMany({
          where: {
            chatId,
            senderId: {
              not: userId,
            },
            status: "SENT",
          },
          data: {
            status: "READ",
          },
        });

        console.log("✅ Updated messages:", result.count);

        io.to(chatId).emit("messages-read", {
          chatId,
        });
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

export const getIO = () => io;
