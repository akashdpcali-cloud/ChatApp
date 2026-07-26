import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(helmet());
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


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});