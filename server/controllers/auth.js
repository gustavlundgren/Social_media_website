const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { default: User } = require("../models/User");

const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    picturePath,
    friends,
    location,
    school,
  } = req.body;

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      school,
      interactions: 0,
      views: 0,
    });

    const savedUser = newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = User.findOne({ email: email });
    if (!user)
      return res.status(400).json({ message: "User found with that email." });

    const match = bcrypt.compare(password, user.password);
    if (!match) return res.status(403).json({ message: "Invalid credetials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };
