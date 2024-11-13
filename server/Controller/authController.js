const asyncHandler = require("express-async-handler");
const userSchema = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authController = {
  register: asyncHandler(async (req, res) => {
    const { email, password, username, name, profilePic, coverPic } = req.body;
    if (!email || !password || !username || !name) {
      throw new Error("All fields are required");
    }
    const valid = await userSchema.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (valid) {
      throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const pass = password;
    const hashedPassword = await bcrypt.hash(pass, salt);
    const user = new userSchema({
      email,
      password: hashedPassword,
      username,
      name,
      profilePic,
      coverPic,
    });
    await user.save();
    res.status(201).json(user);
  }),
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      throw new Error("All fields are required");
    }
    const user = await userSchema.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ id: user._id }, "ramkey", {
      expiresIn: "5h",
    });
    const id = user._id;
    res.status(200).json({
      token,
      id,
      message: "User logged in",
    });
  }),
  profile: asyncHandler(async (req, res) => {
    // const user = await userSchema.findById(req.user).select("-password");
    res.status(200).json({ message: "User profile" });
  }),
};
module.exports = { authController };
