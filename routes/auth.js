var express = require("express");
const { signUp, login } = require("../controller/auth");
const authRouter = express.Router();

authRouter.post("/signup", signUp).post("/login", login);

module.exports = authRouter;
