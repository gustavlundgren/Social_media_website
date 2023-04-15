const express = require("express");
const verifyToken = require("../middleware/auth");
const {
  getFeedPosts,
  getUserPosts,
  likePost,
} = require("../controllers/posts");
const router = express.Router();

/* Read */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* Update */
router.patch("/:id/like", verifyToken, likePost);

module.exports = router;
