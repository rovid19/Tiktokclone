import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment: String,
  video: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const commentModel = mongoose.model("Comment", commentSchema);

export default commentModel;
