const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const userRouter = require("./users");
const itemsRouter = require("./clothingItems");
const {
  validateLoginBody,
  validateUserBody,
} = require("../middlewares/validation");
const { NotFoundError } = require("../middlewares/errors");

router.post("/signin", validateLoginBody, login);
router.post("/signup", validateUserBody, createUser);
router.use("/users", userRouter);
router.use("/items", itemsRouter);

router.use(() => {
  throw new NotFoundError("Requested resource not found");
});

module.exports = router;
