const express = require("express");
const verifyToken = require("../middleware/auth");
const {
  getUserFriend,
  addRemoveFriend,
} = require("../controllers/users");
const router = express.Router();

/* Create */

/* Read */
router.get("/:id/friends", verifyToken, getUserFriend);

/* Update */
router.put("/:id/:friendId", verifyToken, addRemoveFriend);

/* Delete */

module.exports = router;
