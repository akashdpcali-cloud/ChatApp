import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  createChat,
  getChats,
  getOneToOneChats,
  getChatMessages,
  sendMessage,
  deleteChat,
  clearChat,
  blockChat,
  getBlockedChats,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", protect, createChat);

router.get("/", protect, getChats);

router.delete("/:chatId", protect, deleteChat);

router.get("/one-to-one-chat", protect, getOneToOneChats);

router.post("/:chatId/messages", protect, sendMessage);

router.get("/:chatId/messages", protect, getChatMessages);

router.delete("/:chatId/clear-chat", protect, clearChat);

router.post("/:chatId/block", protect, blockChat);

router.get("/blocked", protect, getBlockedChats);

export default router;
