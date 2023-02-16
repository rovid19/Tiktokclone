import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  title: String,
  description: String,
  comments: [String],
  likes: 0,
});

const videoModel = mongoose.model("Video", videoSchema);

export default videoModel;
