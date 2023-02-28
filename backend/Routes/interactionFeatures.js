import express from "express";
import {
  sendLike,
  removeLike,
  sendComment,
  deleteComment,
  getAllComments,
  followUser,
  unfollowUser,
} from "../Controllers/interactionFeatures.js";

const router = express.Router();

//SEND LIKE
router.put("/send-like", sendLike);

//REMOVE LIKE
router.put("/remove-like", removeLike);

//SEND COMMENT
router.post("/send-comment", sendComment);

//DELETE COMMENT
router.post("/delete-comment", deleteComment);

//GET ALL COMMENTS
router.post("/get-comments", getAllComments);

//FOLLOW USER
router.post("/follow-user/:id", followUser);

//UNFOLLOW USER
router.post("/unfollow-user/:username", unfollowUser);

export default router;
