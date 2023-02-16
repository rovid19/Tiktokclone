import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: String,
  password: String,
  followers: [],
  following: [],
  videoLikes: 0,
  profilePhoto: [String],
  description: String,
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
