const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");

router.get("/", getItems);
router.post("/", auth, createItem);
router.delete("/:id", auth, deleteItem);
router.put("/:id/likes", auth, likeItem);
router.delete("/:id/likes", auth, unlikeItem);

module.exports = router;
