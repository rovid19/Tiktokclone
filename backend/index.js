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
import CircularJSON from "circular-json";
import Comments from "./Models/Comments.js";

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
          res.setHeader("Cache-Control", "no-cache");
          res.setHeader("Expires", "Thu, 01 Jan 1970 00:00:00 GMT");
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

app.get("/updatedprofile/:username", async (req, res) => {
  const { username } = req.params;
  const newUser = await User.findById(username);
  res.json(newUser);
});

app.get("/profile/:username", async (req, res) => {
  const { username } = req.params;
  const newUser = await User.findById(username);
  res.json(newUser);
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
  const { title, description, video, username } = req.body;
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const newVideo = await Video.create({
      title,
      video,
      description,
      owner: userData.id,
      username,
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

app.get("/get-videos/:id", async (req, res) => {
  const { id } = req.params;

  const userVideos = await Video.find({ owner: id });
  res.json(userVideos);
});

app.put("/send-like", async (req, res) => {
  const { token } = req.cookies;
  const { like, likedVideo } = req.body;
  console.log(like, likedVideo);

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const user = await User.findById(userData.id);

    await user.set({
      likedVideos: likedVideo,
    });
    await user.save();

    const video = await Video.findOne({ video: likedVideo });
    video.likes.push(like);
    await video.save();
    const usersVideo = await User.findById(video.owner);

    usersVideo.videoLikes = usersVideo.videoLikes + 1;
    await usersVideo.save();

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
    const { likedVideos, videoLikes } = user;

    user.set({
      likedVideos: newLiked,
    });
    await user.save();

    const video = await Video.findOne({ video: likedVideo });
    const newLike = video.likes.filter((item) => item !== like);
    const newUser = await User.findById(video.owner);

    newUser.set({
      videoLikes: videoLikes - 1,
    });
    await newUser.save();

    video.set({
      likes: newLike,
    });
    await video.save();
    res.json(newUser);
  });
});

app.post("/comment", async (req, res) => {
  const { profilePhotoSet, comment, name, id, username } = req.body;

  const newProfile = profilePhotoSet.toString();
  const commment = await Comments.create({
    profile: newProfile,
    comment: comment,
    video: name,
    owner: id,
    username: username,
  });

  res.json(commment);
});

app.post("/get-comments", async (req, res) => {
  const { name } = req.body;
  const allComments = await Comments.find({ video: name });
  res.json(allComments);
});

app.post("/delete-comment", async (req, res) => {
  const { commentDelete } = req.body;

  const deleteVideo = await Comments.findByIdAndDelete(commentDelete);
  res.status(200).json(deleteVideo);
});

app.post("/searched-user", async (req, res) => {
  const { input } = req.body;

  const searchedUser = await User.find({
    username: { $regex: input, $options: "i" },
  });

  res.json(searchedUser);
});

app.post("/searched-video", async (req, res) => {
  const { input } = req.body;

  const searchedVideo = await Video.find({
    $or: [
      { title: { $regex: input, $options: "i" } },
      { description: { $regex: input, $options: "i" } },
    ],
  });

  res.json(searchedVideo);
});

app.post("/follow-user/:id", async (req, res) => {
  const { token } = req.cookies;
  const { id } = req.params;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const userFollows = await User.findById(userData.id);
    const userFollowed = await User.findById(id);
    const { profilePhoto, description, username } = userFollowed;
    const newFollowing = {
      profile: profilePhoto.toString(),
      username: username,
      description: description,
      id: id,
    };
    userFollows.following.push(newFollowing);
    await userFollows.save();

    console.log(userFollows.following);
  });
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const userFollows = await User.findById(userData.id);
    const userFollowed = await User.findById(id);
    const { profilePhoto, description, username } = userFollows;
    const newFollowing = {
      profile: profilePhoto.toString(),
      username: username,
      description: description,
      id: userData.id,
    };
    userFollowed.followers.push(newFollowing);
    await userFollowed.save();
    res.json(userFollows);
  });
});

app.post("/unfollow-user/:username", async (req, res) => {
  const { token } = req.cookies;
  const { username } = req.params;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    const userUnfollows = await User.findById(userData.id);
    const userUnFollowed = await User.findById(username);
    const index = userUnfollows.following.findIndex(
      (item) => item.id === username
    );

    if (index > -1) {
      userUnfollows.following.splice(index, 1);
    }
    await userUnfollows.save();

    const indexDva = userUnFollowed.followers.findIndex(
      (item) => item.id === userData.id
    );
    if (indexDva > -1) {
      userUnFollowed.followers.splice(indexDva, 1);
    }
    await userUnFollowed.save();
    res.json(userUnFollowed);
  });
});

app.get("/following-users", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const user = await User.findById(userData.id);
    const data = user.following;

    res.json(data);
  });
});

app.get("/top-creator", async (req, res) => {
  const allUsers = await User.find();

  const sorted = allUsers.sort((a, b) => b.videoLikes - a.videoLikes);

  const top5 = sorted.splice(0, 5);
  res.json(top5);
});

app.get("/get-following-videos/:username", async (req, res) => {
  const { username } = req.params;
  const videoArray = [];

  const user = await User.findById(username);
  const { following } = user;
  for (const item of following) {
    const id = item.id;
    const itemVideo = await Video.find({ owner: id });
    videoArray.push(itemVideo);
  }

  const oneArray = videoArray.concat.apply([], videoArray);

  res.json(oneArray);
});
