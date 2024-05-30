const router = require("express").Router();
const { getCurrentUser, modifyUserData } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateModifyUserBody } = require("../middlewares/validation");

router.use(auth);

router.get("/me", getCurrentUser);
router.patch("/me", validateModifyUserBody, modifyUserData);

module.exports = router;
