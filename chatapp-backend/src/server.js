import dotenv from "dotenv";

dotenv.config();

import express from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import { initializeSocket } from "./socket/socket.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import groupRoutes from "./routes/group.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

app.use(cors());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use((req, res, next) => {
  res.setHeader(
    "Cross-Origin-Resource-Policy",
    "cross-origin"
  );

  next();
});

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Chat App Backend Running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "../public/uploads"))
);

app.use(
  "/images",
  express.static(path.join(__dirname, "../public/images"))
);

app.use("/api/chats", chatRoutes);

app.use("/api/groups", groupRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});