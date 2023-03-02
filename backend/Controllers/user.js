import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import Video from "../Models/Video.js";

const jwtSecret = "rockjefakatludirock";

export const getprofile = async (req, res) => {
  const { token } = req.cookies;
  if (token)
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const userDoc = await User.findById(userData.id);
      res.json(userDoc);
    });
  else {
  }
};

export const editprofile = async (req, res) => {
  const { token } = req.cookies;
  const { usernam, email, bio, photo } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const userEdit = await User.findById(userData.id);
    userEdit.set({
      username: usernam,
      email,
      profilePhoto: photo,
      description: bio,
    });
    await userEdit.save();
    res.json(userEdit);
  });
};

export const setprofile = async (req, res) => {
  const { username } = req.params;
  console.log(username);
  const newUser = await User.findById(username);
  res.json(newUser);
};

export const followingUsers = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const user = await User.findById(userData.id);
    const data = user.following;

    res.json(data);
  });
};

export const getTopCreator = async (req, res) => {
  const allUsers = await User.find();

  const sorted = allUsers.sort((a, b) => b.videoLikes - a.videoLikes);

  const top5 = sorted.splice(0, 5);
  res.json(top5);
};

export const getFollowingVideos = async (req, res) => {
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
};
