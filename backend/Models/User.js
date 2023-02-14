import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: String,
  password: String,
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
