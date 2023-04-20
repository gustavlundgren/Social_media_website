const express = require("express");
const verifyToken = require("../middleware/auth");
const {
  getUserFriend,
  addRemoveFriend,
  getUserById,
} = require("../controllers/users");
const router = express.Router();

/* Create */

/* Read */
router.get("/:id/friends", verifyToken, getUserFriend);
router.get("/:id", verifyToken, getUserById);

/* Update */
router.put("/:id/:friendId", verifyToken, addRemoveFriend);

/* Delete */

module.exports = router;
