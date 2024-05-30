require("dotenv").config();

const DEV_SECRET = "didyouhearthatstevejobsdiedofligma";
const { JWT_SECRET } = process.env;

module.exports = {
  DEV_SECRET,
  JWT_SECRET,
};
