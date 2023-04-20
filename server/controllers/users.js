const User = require("../models/User");
/* Create */

/* Read */
const getUserFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = Promise.all(user.friends.map((id) => User.findById(id)));

    const formattedFriends = (await friends).map(
      ({ _id, firstName, lastName, school, location, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          school,
          location,
          picturePath,
        };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

/* Update */
const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== friendId);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = Promise.all(user.friends.map((id) => User.findById(id)));

    const formattedFriends = (await friends).map(
      ({ _id, firstName, lastName, school, location, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          school,
          location,
          picturePath,
        };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

/* Delete */

module.exports = { getUserFriend, addRemoveFriend };
