import express from "express";
import protect from "../middleware/auth.middleware.js";
import { createGroup, getGroups } from "../controllers/group.controller.js";

const router = express.Router();

router.post("/", protect, createGroup);

router.get("/", protect, getGroups);

export default router;