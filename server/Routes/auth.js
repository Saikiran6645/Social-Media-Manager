const express = require("express");
const { authController } = require("../Controller/authController");
const AuthRoute = express.Router();
const userAuth = require("../Middleware/authMiddleware");
AuthRoute.post("/register", authController.register);
AuthRoute.post("/login", authController.login);
AuthRoute.get("/profile", userAuth, authController.profile);
AuthRoute.get("/user/:id", authController.user);
module.exports = { AuthRoute };
