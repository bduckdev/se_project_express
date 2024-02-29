const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { handleErr } = require("../utils/errors");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid Email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = async function findUserByCredentials(
  email,
  password,
  res,
) {
  try {
    const user = await this.findOne({ email });

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new Error();
      }

      return user;
    });
  } catch (e) {
    return handleErr(res, e);
  }
};

module.exports = mongoose.model("user", userSchema);
