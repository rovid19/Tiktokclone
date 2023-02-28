import User from "../Models/User.js";
import Video from "../Models/Video.js";

export const searchUser = async (req, res) => {
  const { input } = req.body;

  const searchedUser = await User.find({
    username: { $regex: input, $options: "i" },
  });

  res.json(searchedUser);
};

export const searchVideo = async (req, res) => {
  const { input } = req.body;

  const searchedVideo = await Video.find({
    $or: [
      { title: { $regex: input, $options: "i" } },
      { description: { $regex: input, $options: "i" } },
    ],
  });

  res.json(searchedVideo);
};
