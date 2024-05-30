function errorHandler(e, _, res, next) {
  if (e.statusCode === 500) {
    res.status(500).send("An error has occured on the server");
    next();
  } else {
    console.log(e);
    res.status(e.statusCode).send({ message: e.message });
    next();
  }
}

module.exports = errorHandler;
