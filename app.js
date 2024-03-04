const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const indexRouter = require("./routes/index");
const { NOT_FOUND } = require("./utils/errors");

const app = express();
const { PORT = 3001 } = process.env;

app.use(cors());
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Successfully connected to DB");
  })
  .catch((e) => console.error(e));

app.use(express.json());
app.use("/", indexRouter);

app.use((_, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
