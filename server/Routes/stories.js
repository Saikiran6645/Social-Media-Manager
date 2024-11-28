const express = require("express");
const { storyController } = require("../Controller/storyController");
const storyRoutes = express.Router();
const userAuth = require("../Middleware/authMiddleware");
storyRoutes.post("/createStory", storyController.postStory);
storyRoutes.get("/getStory", storyController.getStory);
module.exports = { storyRoutes };
