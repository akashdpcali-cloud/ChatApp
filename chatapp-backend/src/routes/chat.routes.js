import express from "express";
import protect from "../middleware/auth.middleware.js";
import { createChat, getChats, getOneToOneChats } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", protect, createChat);

router.get("/", protect, getChats);

router.get("/one-to-one-chat", protect, getOneToOneChats);

export default router;