import { Server } from "socket.io";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
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

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

export const getIO = () => io;
