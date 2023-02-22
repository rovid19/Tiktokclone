import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  profile: String,
  comment: String,
  video: String,
  owner: String,
  username: String,
});

const commentModel = mongoose.model("Comment", commentSchema);

export default commentModel;
