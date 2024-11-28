const { get } = require("mongoose");
const postSchema = require("../Model/Post");
const postController = {
  getPosts: async (req, res) => {
    const posts = await postSchema.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  },
  createPost: async (req, res) => {
    const { desc, img, username } = req.body;
    const userId = req.user;

    if (!userId || !desc || !img) {
      throw new Error("All fields are required");
    }
    console.log(userId, desc, img);
    const post = new postSchema({
      userId,
      desc,
      img,
      username,
    });
    await post.save();
    res.status(201).json(post);
  },
};
module.exports = { postController };
