const ClothingItem = require("../models/clothingItem");
const { handleErr } = require("../utils/errors");

async function getItems(_, res) {
  try {
    const items = await ClothingItem.find({});
    return res.status(200).send(items);
  } catch (e) {
    return handleErr(res, e);
  }
}
async function createItem(req, res) {
  const { name, weather, imageUrl } = req.body;
  const { user } = req;
  try {
    const newItem = await ClothingItem.create({
      name,
      weather,
      imageUrl,
      owner: user._id,
    });

    return res.send(newItem);
  } catch (e) {
    return handleErr(res, e);
  }
}
async function deleteItem(req, res) {
  const { user } = req;
  const { id } = req.params;
  try {
    const item = await ClothingItem.findOne({
      _id: id,
    }).orFail();
    if (user._id !== item.owner.toString()) {
      return res.status(403).send({ message: "Incorrect Permissions" });
    }
    const deletedItem = await ClothingItem.findOneAndDelete({ _id: id });
    return res.status(200).send(deletedItem);
  } catch (e) {
    return handleErr(res, e);
  }
}

async function likeItem(req, res) {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail();

    return res.send(item);
  } catch (e) {
    return handleErr(res, e);
  }
}

async function unlikeItem(req, res) {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail();

    return res.send(item);
  } catch (e) {
    return handleErr(res, e);
  }
}

module.exports = { getItems, createItem, deleteItem, likeItem, unlikeItem };
