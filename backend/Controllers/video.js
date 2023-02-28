import jwt from "jsonwebtoken";
import Video from "../Models/Video.js";

const jwtSecret = "rockjefakatludirock";

export const uploadVideo = async (req, res) => {
  const { title, description, vidac, username } = req.body;
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const newVideo = await Video.create({
      title,
      video: vidac,
      description,
      owner: userData.id,
      username,
    });
    res.json(newVideo);
  });
};

export const storeAllVideo = (req, res) => {
  Video.find({}, (err, videos) => {
    if (err) {
      res.json("err");
    }
    if (videos) {
      res.json(videos);
    }
  });
};

export const allVideosFromUser = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    const userVideos = await Video.find({ owner: userData.id });
    res.json(userVideos);
  });
};

export const allVideosFromVisitedUser = async (req, res) => {
  const { id } = req.params;

  const userVideos = await Video.find({ owner: id });
  res.json(userVideos);
};
