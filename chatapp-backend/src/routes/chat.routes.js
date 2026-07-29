import express from "express";
import protect from "../middleware/auth.middleware.js";
import { createChat, getChats } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", protect, createChat);

router.get("/", protect, getChats);

export default router;