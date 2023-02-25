import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: String,
  password: String,
  followers: [
    { username: String, profile: String, description: String, id: String },
  ],
  following: [
    { username: String, profile: String, description: String, id: String },
  ],
  videoLikes: { type: Number, default: 0 },
  likedVideos: [String],
  profilePhoto: [String],
  description: String,
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
