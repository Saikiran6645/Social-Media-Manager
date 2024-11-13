const express = require("express");
const { postController } = require("../Controller/postController");
// const { authController } = require("../Controller/authController");
const userAuth = require("../Middleware/authMiddleware");
const postRoutes = express.Router();
postRoutes.post("/create", userAuth, postController.createPost);
postRoutes.get("/get", userAuth, postController.getPosts);
module.exports = { postRoutes };
