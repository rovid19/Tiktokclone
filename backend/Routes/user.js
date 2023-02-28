import express from "express";
import {
  getprofile,
  editprofile,
  setprofile,
  followingUsers,
  getTopCreator,
  getFollowingVideos,
} from "../Controllers/user.js";

const router = express.Router();

// GET USER AFTER LOGIN OR REGISTRATION
router.get("/profile", getprofile);

// EDIT PROFILE
router.put("/editprofile", editprofile);

// SET PROFILE ACCORDING TO USEPARAMS AND ID
router.get("/profile/:username", setprofile);

// GET ALL USERS FOLLOWINGS
router.get("/following-users", followingUsers);

// GET TOP CREATORS
router.get("/top-creator", getTopCreator);

// GET ALL VIDEOS FROM YOUR FOLLOWINGS
router.get("/get-following-videos/:username", getFollowingVideos);

export default router;
