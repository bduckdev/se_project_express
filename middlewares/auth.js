const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../utils/config");
const { VALIDATION_ERROR } = require("../utils/errors");

function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    res.send(VALIDATION_ERROR);
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    res.send(VALIDATION_ERROR);
  }
}

module.exports = auth;
