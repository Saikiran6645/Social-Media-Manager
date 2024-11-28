const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    username: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", postSchema);
