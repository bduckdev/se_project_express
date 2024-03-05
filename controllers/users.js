const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../utils/config");
const User = require("../models/user");
const { handleErr, BAD_REQUEST, UNAUTHORIZED } = require("../utils/errors");

async function getUsers(_, res) {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (e) {
    return handleErr(res, e);
  }
}

async function createUser(req, res) {
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
    return handleErr(res, e);
  }
}

async function getUser(req, res) {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).orFail();
    return res.status(200).send(user);
  } catch (e) {
    return handleErr(res, e);
  }
}

async function login(req, res) {
  try {
    const user = req.body;
    if (!user.password || !user.email) {
      return res
        .status(BAD_REQUEST)
        .send({ message: "Incorrect email or password" });
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
    if (e.name === "DocumentNotFoundError") {
      return res
        .status(UNAUTHORIZED)
        .send({ message: "Incorrect email or password" });
    }
    return handleErr(res, e);
  }
}

async function getCurrentUser(req, res) {
  try {
    const currentUser = await User.findById(req.user._id);
    return res.status(200).send(currentUser);
  } catch (e) {
    return handleErr(res, e);
  }
}

async function modifyUserData(req, res) {
  try {
    const { name, avatar } = req.body;
    const userData = await User.findOneAndUpdate(
      { _id: req.user._id },
      { name, avatar },
      { new: true, runValidators: true },
    ).orFail();
    return res.status(200).send(userData);
  } catch (e) {
    return handleErr(res, e);
  }
}
module.exports = {
  getUsers,
  getUser,
  createUser,
  login,
  getCurrentUser,
  modifyUserData,
};
