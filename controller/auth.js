const bcrypt = require("bcryptjs");
const userDb = require("../models/user");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { password, username, email } = req.body;
  const SALT = process.env.SALT;

  if (!password || !username || !email) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "All fields are required",
    });
  }

  try {
    const userName = await userDb.find({ username });
    if (userName._id) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).json({
        message: "username already taken",
      });
    }
    const userEmail = await userDb.find({ email });
    if (userEmail._id) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).json({
        message: "user already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, Number(SALT));
    const createdUser = new userDb({ ...req.body, hashedPassword });
    const user = await createdUser.save();
    // const created = await userDb.create({ ...req.body, hashedPassword });
    return res.status(StatusCodes.CREATED).json({
      message: "user created successfully",
      data: user._doc,
    });
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      error: e,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const secret = process.env.SECRET;
  try {
    const user = await userDb.findOne({ email });
    if (!user._id) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "password or email not valid",
      });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      user._doc.hashedPassword
    );
    if (!isPasswordValid) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        message: "password or email not valid",
      });
    }
    const userData = {
      email: user._doc.email,
      username: user._doc.username,
    };
    const token = await jwt.sign(userData, secret, {
      expiresIn: "1d",
    });

    return res.status(StatusCodes.OK).json({
      accessToken: token,
    });
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: e,
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  signUp,
  login,
};
