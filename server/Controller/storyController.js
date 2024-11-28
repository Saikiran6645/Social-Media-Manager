// import { get } from "mongoose";
const storySchema = require("../Model/stories");
const asyncHandler = require("express-async-handler");
const storyController = {
  postStory: asyncHandler(async (req, res) => {
    const { userId, img } = req.body;
    if (!userId || !img) {
      throw new Error("All fields are required");
    }
    const story = new storySchema({
      userId,
      img,
    });
    story.save();
    res.status(200).json(story);
  }),
  getStory: asyncHandler(async (req, res) => {
    const data = await storySchema.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  }),
};
module.exports = { storyController };
