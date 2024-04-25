const {
  NOT_FOUND,
  DEFAULT,
  DUPLICATE_USER,
  BAD_REQUEST,
} = require("../utils/errors");

function errorHandler(err, _, res, next) {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  if (
    err.name === "ValidationError" ||
    err.name === "CastError" ||
    err.name === "TypeError"
  ) {
    return res.status(BAD_REQUEST).send({ message: "Bad request" });
  }
  if (err.name.includes("NotFound")) {
    return res
      .status(NOT_FOUND)
      .send({ message: "Requested resource not found" });
  }
  if (err.name === "DuplicateKey" || err.name === "MongoServerError") {
    return res.status(DUPLICATE_USER).send({ message: "User Already Exists" });
  }
  return res
    .status(DEFAULT)
    .send({ message: "An error has occured on the server" });
}

module.exports = errorHandler;
