const User = require("../models/User");
/* Create */

/* Read */
const getUserFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const user = User.findById(id);

    const friends = user.friends;
    res.status(200).json(friends);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

/* Update */
const addFriend = async (req, res) => {};
const removeFriend = async (req, res) => {};

/* Delete */

module.exports = { getUserFriend, addFriend, removeFriend };
