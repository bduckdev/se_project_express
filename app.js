const express = require("express");
const { errors } = require("celebrate");
const mongoose = require("mongoose");
const cors = require("cors");
const indexRouter = require("./routes/index");
const { NOT_FOUND } = require("./utils/errors");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3001 } = process.env;

app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Successfully connected to DB");
  })
  .catch((e) => console.error(e));

app.use(express.json());
app.use(requestLogger);
app.use("/", indexRouter);

app.use((_, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

app.use(errors());
app.use(errorHandler);

app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
