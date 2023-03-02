import express from "express";
import { register, login, logout } from "../Controllers/auth.js";

const router = express.Router();

// CREATE A USER

router.post("/register", register);

// LOGIN

router.post("/login", login);

// LOGOUT

router.post("/logout", logout);

router.get("/da", (req, res) => {
  res.send("ok");
});

export default router;
