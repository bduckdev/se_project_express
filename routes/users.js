const router = require("express").Router();
const { getCurrentUser, modifyUserData } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.use(auth);

router.get("/me", getCurrentUser);
router.patch("/me", modifyUserData);

module.exports = router;
