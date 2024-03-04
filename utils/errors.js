const BAD_REQUEST = 400;
const VALIDATION_ERROR = 401;
const BAD_PERMISSIONS = 403;
const NOT_FOUND = 404;
const DEFAULT = 500;
const DUPLICATE_USER = 409;

function handleErr(res, e) {
  if (
    e.name === "ValidationError" ||
    e.name === "CastError" ||
    e.name === "TypeError"
  ) {
    return res.status(BAD_REQUEST).send({ message: "Bad request" });
  }
  if (e.name.includes("NotFound")) {
    return res
      .status(NOT_FOUND)
      .send({ message: "Requested resource not found" });
  }
  if (e.name === "DuplicateKey" || e.name === "MongoServerError") {
    return res.status(DUPLICATE_USER).send({ message: "User Already Exists" });
  }
  return res
    .status(DEFAULT)
    .send({ message: "An error has occured on the server" });
}

module.exports = {
  handleErr,
  BAD_REQUEST,
  BAD_PERMISSIONS,
  VALIDATION_ERROR,
  NOT_FOUND,
  DEFAULT,
  DUPLICATE_USER,
};
