const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../utils/config");
const User = require("../models/user");
const { handleErr, DUPLICATE_USER } = require("../utils/errors");

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
    }).then((data) => {
      if (!data.ok) {
        throw Error(DUPLICATE_USER);
      }
      const userData = {};
      userData.name = data.name;
      userData.avatar = data.avatar;
      userData.email = data.email;
      return userData;
    });
    return res.status(201).send(newUser);
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
    const foundUser = await User.findUserByCredentials(
      user.email,
      user.password,
    ).orFail();
    const token = jwt.sign({ _id: foundUser._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).send(token);
  } catch (e) {
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
    );
    console.log(userData);
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
