import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import authRroutes from "./Routes/auth.js";
import userRoutes from "./Routes/user.js";
import uploadRoutes from "./Routes/upload.js";
import videoRoutes from "./Routes/video.js";
import interactionRoutes from "./Routes/interactionFeatures.js";
import searchRoutes from "./Routes/search.js";

// KONFIGURACIJA SERVERA
const app = express();
const PORT = 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
mongoose.connect(process.env.MONGOOSE_URL);
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://gymtokweb.onrender.com"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.listen(PORT);

//slike
app.use("/uploads", express.static(__dirname + "/uploads"));

// KOD
app.use("/api/auth", authRroutes);
app.use("/api/user", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/interaction", interactionRoutes);
app.use("/api/search", searchRoutes);
