const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, min: 4, max: 25 },
    lastName: { type: String, required: true, min: 4, max: 25 },
    email: { type: String, required: true, min: 4, max: 25 },
    password: { type: String, required: true, min: 4, max: 25 },
    picturePath: { type: String, default: "" },
    friends: { type: Array, default: [] },
    location: String,
    school: String,
    interactions: Number,
    views: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
