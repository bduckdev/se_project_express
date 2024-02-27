const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const { NOT_FOUND } = require("./utils/errors");

const app = express();
const { PORT = 3001 } = process.env;

app.use((req, _, next) => {
  req.user = {
    _id: "65dbc489fc3a746e2fbc10d2", // paste the _id of the test user created in the previous step
  };
  next();
});

app.use((req, res, next) => {
  if (!req.route) {
    return res
      .status(NOT_FOUND)
      .send({ message: "Requested resource not found" });
  }
  return next();
});

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Successfully connected to DB");
  })
  .catch((e) => console.error(e));

app.use(express.json());
app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
