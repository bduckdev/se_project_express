const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const { BadRequestError, ConflictError } = require("../middlewares/errors");

async function createUser(req, res, next) {
  try {
    const { name, avatar, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      avatar,
      email,
      password: hashedPassword,
    });
    const userData = {
      name: newUser.name,
      avatar: newUser.avatar,
      email: newUser.email,
    };
    return res.status(201).send(userData);
  } catch (e) {
    if (e.name === "ValidationError") {
      return next(new BadRequestError("Invalid Data"));
    }
    if (e.code === 11000) {
      return next(new ConflictError("Email already exists"));
    }
    return next(e);
  }
}

async function login(req, res, next) {
  try {
    const user = req.body;
    if (!user.password || !user.email) {
      throw new BadRequestError();
    }
    const foundUser = await User.findUserByCredentials(
      user.email,
      user.password,
    );
    const token = jwt.sign({ _id: foundUser._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).send({ token });
  } catch (e) {
    if (e.name === "ValidationError") {
      return next(new BadRequestError("Invalid Data"));
    }
    return next(e);
  }
}

async function getCurrentUser(req, res, next) {
  try {
    const currentUser = await User.findById(req.user._id);
    return res.status(200).send(currentUser);
  } catch (e) {
    return next(e);
  }
}

async function modifyUserData(req, res, next) {
  try {
    const { name, avatar } = req.body;
    const userData = await User.findOneAndUpdate(
      { _id: req.user._id },
      { name, avatar },
      { new: true, runValidators: true },
    ).orFail();
    return res.status(200).send(userData);
  } catch (e) {
    return next(e);
  }
}

module.exports = {
  createUser,
  login,
  getCurrentUser,
  modifyUserData,
};
