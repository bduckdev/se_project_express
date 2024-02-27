const User = require("../models/user");
const { handleErr } = require("../utils/errors");

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
    const { name, avatar } = req.body;
    const newUser = await User.create({ name, avatar });
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

module.exports = { getUsers, getUser, createUser };
