import jwt from "jsonwebtoken";
import User from "../Models/User.js";

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
  const { username, email, bio, photo } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const userEdit = await User.findById(userData.id);
    userEdit.set({
      username,
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
  const newUser = await User.findById(username);
  res.json(newUser);
};
