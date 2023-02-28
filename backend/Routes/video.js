import express from "express";
import {
  uploadVideo,
  storeAllVideo,
  allVideosFromUser,
  allVideosFromVisitedUser,
} from "../Controllers/video.js";

const router = express.Router();

// UPLOAD VIDEO AND SAVE IT TO MONGOOSE SCHEMA
router.post("/videos", uploadVideo);

//GET ALL VIDEOS FOR HOME PAGE
router.get("/get-all-videos", storeAllVideo);

//GET ALL VIDEOS FROM LOGGED IN USER
router.get("/user-videos", allVideosFromUser);

// GET ALL VIDEOS FROM NON LOGGED IN USER WHEN VISITING HIS PROFILE
router.get("/visited-user-videos/:id", allVideosFromVisitedUser);

export default router;
