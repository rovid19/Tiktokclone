import express from "express";
import { searchUser, searchVideo } from "../Controllers/search.js";

const router = express.Router();

// SEARCH USER
router.post("/searched-user", searchUser);

//SEARCH VIDEO
router.post("/searched-video", searchVideo);

export default router;
