const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const userRouter = require("./users");
const itemsRouter = require("./clothingItems");

router.post("/signin", login);
router.post("/signup", createUser);
router.use("/users", userRouter);
router.use("/items", itemsRouter);

module.exports = router;
