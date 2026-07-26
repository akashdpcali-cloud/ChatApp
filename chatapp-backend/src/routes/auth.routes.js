import express from "express";
import {
  register,
  login,
  logout,
  getMe,
  changePassword,
  deleteAccount,
} from "../controllers/auth.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", protect, getMe);

router.post("/change-password", protect, changePassword);

router.delete("/delete-account", protect, deleteAccount);

export default router;