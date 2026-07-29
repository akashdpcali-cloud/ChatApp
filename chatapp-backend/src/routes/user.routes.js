import express from "express";
import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import { changeUsername, changeProfilePicture, searchUser} from "../controllers/user.controller.js";

const router = express.Router();

router.patch("/change-username", protect, changeUsername);

router.patch(
  "/profile-picture",
  protect,
  upload.single("profilePicture"),
  changeProfilePicture
);

router.get("/search", protect, searchUser);

export default router;