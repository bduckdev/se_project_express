const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../utils/config");
const { handleErr } = require("../utils/errors");

function auth(req, res, next) {
  const authorization = req.headers.Authorization;
  const token = authorization.replace("Bearer ", "");

  const payload = jwt.verify(token, JWT_SECRET);
  req.user = payload;
  next();
}

module.exports = auth;
