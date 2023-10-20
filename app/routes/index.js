// INPORT LIBRARY
const Router = require("express").Router();

// INPORT CHILD ROUTES AND ASSETS
const authMiddleware = require("../middlewares/auth");
const authRoutes = require("./auth.routes");
const postRoutes = require("./posts.routes");
const userRoutes = require("./user.routes");

// BIND ROUTES FROM DFFRENT FILE
Router.use("/auth/", authRoutes);
Router.use("/posts", authMiddleware, postRoutes);
Router.use("/user", authMiddleware, userRoutes);

module.exports = Router;
