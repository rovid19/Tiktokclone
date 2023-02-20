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
import multer from "multer";
import fs from "fs";
import Video from "../backend/Models/Video.js";

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

//slike
const photosMiddleware = multer({ dest: __dirname + "/uploads" });
app.use("/uploads", express.static(__dirname + "/uploads"));
//video
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/videos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

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
      res.status(422).json("password not found");
    }
  } else {
    res.status(400).json("email not found");
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

app.put("/editprofile", async (req, res) => {
  const { token } = req.cookies;
  const { username, email, bio, photo } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const userEdit = await User.findById(userData.id);
    userEdit.set({
      username,
      email,
      profilePhoto: photo,
      description: bio,
    });
    await userEdit.save();
    res.json(userEdit);
  });
});

app.get("/updatedprofile", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const updatedUser = await User.findById(userData.id);
    res.json(updatedUser);
  });
});

app.post(
  "/upload-image",
  photosMiddleware.array("photo", 100),
  async (req, res) => {
    const uploadedFiles = [];
    const { path, originalname } = req.files[0];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    const final = newPath.replace(
      "C:\\Users\\Ljubo\\Documents\\GitHub\\Tiktokclone\\backend\\uploads\\",
      ""
    );
    fs.renameSync(path, newPath);
    await uploadedFiles.push(final);
    res.json(final);
  }
);

app.post("/upload-video", upload.single("video"), (req, res) => {
  const { path, filename } = req.file;
  res.json(filename);
});

app.post("/video", async (req, res) => {
  const { title, description, video, like } = req.body;
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const newVideo = await Video.create({
      title,
      video,
      description,
      owner: userData.id,
    });
    res.json(newVideo);
  });
});

app.get("/video-store", (req, res) => {
  Video.find({}, (err, videos) => {
    if (err) {
      res.json("err");
    }
    if (videos) {
      res.json(videos);
    }
  });
});

app.get("/get-videos", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    const userVideos = await Video.find({ owner: userData.id });
    res.json(userVideos);
  });
});

app.put("/send-like", async (req, res) => {
  const { token } = req.cookies;
  const { like, likedVideo } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const user = await User.findById(userData.id);
    await user.set({
      likedVideos: likedVideo,
    });
    await user.save();

    const video = await Video.findOne({ video: likedVideo });
    await video.set({
      likes: like,
    });
    await video.save();
    res.json(video);
  });
});

app.put("/remove-like", async (req, res) => {
  const { token } = req.cookies;
  const { like, likedVideo } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const user = await User.findById(userData.id);
    const newLiked = user.likedVideos.filter((item) => item !== likedVideo);

    await user.set({
      likedVideos: newLiked,
    });
    await user.save();

    const video = await Video.findOne({ video: likedVideo });
    const newLike = video.likes.filter((item) => item !== like);

    await video.set({
      likes: newLike,
    });
    await video.save();
    res.json(video);
  });
});
