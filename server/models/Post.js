const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    description: {
      type: String,
      max: 150,
    },
    picturePath: { type: String, default: "" },
    userPicturePath: { type: String, default: "" },
    likes: Map,
    comments: { type: Array, default: [] },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
