const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../utils/config");
const { UNAUTHORIZED } = require("../utils/errors");

function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(UNAUTHORIZED).send({ message: "Authorization error" });
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    res.status(UNAUTHORIZED).send({ message: "Authorization error" });
  }
}

module.exports = auth;
