const ForbiddenError = require("../middlewares/errors/ForbiddenError");
const ClothingItem = require("../models/clothingItem");
const { NOT_FOUND } = require("../utils/errors");

async function getItems(_, res, next) {
  try {
    const items = await ClothingItem.find({});
    return res.status(200).send(items);
  } catch (e) {
    return next(e);
  }
}
async function createItem(req, res, next) {
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
    return next(e);
  }
}
async function deleteItem(req, res, next) {
  const { user } = req;
  const { id } = req.params;
  try {
    const item = await ClothingItem.findOne({
      _id: id,
    }).orFail();
    if (user._id !== item.owner.toString()) {
      throw new ForbiddenError();
    }
    const deletedItem = await ClothingItem.findOneAndDelete({ _id: id });
    return res.status(200).send(deletedItem);
  } catch (e) {
    return next(e);
  }
}

async function likeItem(req, res, next) {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail();

    return res.send(item);
  } catch (e) {
    if (e.name === "DocumentNotFoundError") {
      return res.status(NOT_FOUND).send({ message: "Unauthorized" });
    }
    return next(e);
  }
}

async function unlikeItem(req, res, next) {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail();

    return res.send(item);
  } catch (e) {
    return next(e);
  }
}

module.exports = { getItems, createItem, deleteItem, likeItem, unlikeItem };
