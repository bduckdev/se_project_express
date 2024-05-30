const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("./errors");

function auth(req, _, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(UnauthorizedError("Authorization error"));
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (e) {
    return next(UnauthorizedError("Authorization error"));
  }
}

module.exports = auth;
