const express = require("express");
const verifyToken = require("../middleware/auth");
const {
  getUserFriend,
  addFriend,
  removeFriend,
} = require("../controllers/users");
const router = express.Router();

/* Create */

/* Read */
router.get("/:id/friends", verifyToken, getUserFriend);

/* Update */
router.put("/:id/add-friend", verifyToken, addFriend);
router.put("/:id/remove-friend", verifyToken, removeFriend);

/* Delete */

module.exports = router;
