import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import User from "../backend/Models/User.js";

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
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(cookieParser());
app.listen(PORT);

const jwtSecret = "rockjefakatludirock";
const bcryptSalt = bcrypt.genSaltSync(10);

console.log(process.env.MONGOOSE_URL);
// KOD
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({
      email: email,
      username: username,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(newUser);
  } catch {
    res.status(422).json("nijebrodo");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const checkPass = bcrypt.compareSync(password, userDoc.password);

    if (checkPass) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        async (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(token);
        }
      );
    } else {
      res.status(422).json("error");
    }
  } else {
    res.json("user not found");
  }
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (token)
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const userDoc = await User.findById(userData.id);
      res.json(userDoc);
    });
  else {
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});
