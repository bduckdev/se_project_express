const User = require("../models/user");

function handleErr(res, e) {
  if (e.name === "ValidationError" || e.name === "CastError") {
    return res.status(400).send({ message: e.message });
  }
  if (e.name.includes("NotFound")) {
    return res.status(404).send({ message: e.message });
  }
  return res.status(500).send({ message: e.message });
}

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
