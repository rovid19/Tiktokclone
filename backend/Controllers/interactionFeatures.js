import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import Video from "../Models/Video.js";
import Comments from "../Models/Comments.js";

const jwtSecret = "rockjefakatludirock";

export const sendLike = async (req, res) => {
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
};

export const removeLike = async (req, res) => {
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
};

export const sendComment = async (req, res) => {
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
};

export const deleteComment = async (req, res) => {
  const { commentDelete } = req.body;

  const deleteVideo = await Comments.findByIdAndDelete(commentDelete);
  res.status(200).json(deleteVideo);
};

export const getAllComments = async (req, res) => {
  const { name } = req.body;
  const allComments = await Comments.find({ video: name });
  console.log(allComments);
  res.json(allComments);
};

export const followUser = async (req, res) => {
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
};

export const unfollowUser = async (req, res) => {
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
};
