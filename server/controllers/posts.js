const Post = require("../models/Post");
const User = require("../models/User");

/* Create */
const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;

    const user = await User.findById(userId);

    const newPost = new Post({
      userId,
      firstname: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();
    const posts = await Post.find();

    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

/* Read */
const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getUserPosts = async (res, req) => {
  try {
    const { userId } = req.params;
    const posts = await Post.findById(userId);

    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

/* Update */

const likePost = async (res, req) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const liked = post.likes.get(userId);

    if (liked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = { createPost, getFeedPosts, getUserPosts, likePost };
