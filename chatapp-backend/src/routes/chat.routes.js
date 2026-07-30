import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  createChat,
  getChats,
  getOneToOneChats,
  getChatMessages,
  sendMessage,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", protect, createChat);

router.get("/", protect, getChats);

router.get("/one-to-one-chat", protect, getOneToOneChats);

router.post("/:chatId/messages", protect, sendMessage);

router.get("/:chatId/messages", protect, getChatMessages);

export default router;