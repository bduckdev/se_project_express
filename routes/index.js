const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const userRouter = require("./users");
const itemsRouter = require("./clothingItems");
const {
  validateLoginBody,
  validateUserBody,
} = require("../middlewares/validation");

router.post("/signin", validateLoginBody, login);
router.post("/signup", validateUserBody, createUser);
router.use("/users", userRouter);
router.use("/items", itemsRouter);

module.exports = router;
