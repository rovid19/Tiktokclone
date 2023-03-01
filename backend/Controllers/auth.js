import bcrypt from "bcrypt";
import User from "../Models/User.js";
import jwt from "jsonwebtoken";

const jwtSecret = "rockjefakatludirock";
const bcryptSalt = bcrypt.genSaltSync(10);

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({
      email: email,
      username: username,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(newUser);
  } catch {
    res.status(422).json("nijebrodo");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const checkPass = bcrypt.compareSync(password, userDoc.password);

    if (checkPass) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        async (err, token) => {
          if (err) throw err;

          res.cookie("token", token).json(token);
        }
      );
    } else {
      res.status(422).json("password not found");
    }
  } else {
    res.status(400).json("email not found");
  }
};

export const logout = (req, res) => {
  res.cookie("token", "").json(true);
};
