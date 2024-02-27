const ClothingItem = require("../models/clothingItem");

function handleErr(res, e) {
  if (e.name === "ValidationError" || e.name === "CastError") {
    return res.status(400).send({ message: e.message });
  }
  if (e.name.includes("NotFound")) {
    return res.status(404).send({ message: e.message });
  }
  return res.status(500).send({ message: e.message });
}

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
  const { id } = req.params;
  try {
    const deletedItem = await ClothingItem.deleteOne({
      _id: id,
    }).orFail();
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
