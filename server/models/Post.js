const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    location: { type: String },
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
