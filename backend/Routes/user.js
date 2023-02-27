import express from "express";
import { getprofile, editprofile, setprofile } from "../Controllers/user.js";

const router = express.Router();

// GET USER AFTER LOGIN OR REGISTRATION
router.get("/profile", getprofile);

// EDIT PROFILE
router.put("/editprofile", editprofile);

// SET PROFILE ACCORDING TO USEPARAMS AND ID
router.get("/profile/:username", setprofile);

export default router;
