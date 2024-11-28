const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const { AuthRoute } = require("./Routes/auth");
const cors = require("cors");
const { AuthRoute } = require("./Routes/auth");
const { errorHandler } = require("./Middleware/ErrorHandler");
const { postRoutes } = require("./Routes/post");
const { storyRoutes } = require("./Routes/stories");
app.use(cors());
app.use(express.json({ extended: true, limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
const PORT = process.env.PORT || 3000;
app.use("/api/auth/", AuthRoute);
// app.use("/api/user/", userRoutes);
// app.use("/api/commnents/", commentRoutes);
// app.use("/api/likes/", likesRoutes);
app.use("/api/posts/", postRoutes);
app.use("/api/story/", storyRoutes);
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/socialMedia");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error.message);
  }
};
connectDB();
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
