var express = require("express");
var router = express.Router();
const protected = require("../utils/authenticate");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const Item = require("../models/Item");
const Search = require("../models/Search");

// get all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.json({ messge: err });
  }
});

// post an item
router.post("/", upload.single("imagine"), async (req, res) => {
  const img = await cloudinary.uploader.upload(req.file.path);
  const item = new Item({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    location: req.body.location,
    imagine: img.secure_url,
    cloudinary_id: img.public_id,
    price: req.body.price,
    sellerName: req.body.sellerName
    // sellerEmail: req.body.sellerEmail
  });
  try {
    const savedItem = await item.save();
    res.json("Item added successfully!");
    res.json(savedItem);
  } catch (err) {
    res.json(err);
  }
});

// get a specific item post
router.get("/:itemId", async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    res.json(item);
  } catch (err) {
    res.json(err);
  }
});

// update a specific item post
router.patch("/:itemId", upload.single("imagine"), async (req, res) => {
  try {
    let item = await Item.findById(req.params.itemId);
    await cloudinary.uploader.destroy(item.cloudinary_id);
    const result = await cloudinary.uploader.upload(req.file.path);
    const data = {
      title: req.body.title || item.title,
      description: req.body.description || item.description,
      category: req.body.category || item.category,
      location: req.body.location || item.location,
      imagine: result.secure_url || item.imagine,
      cloudinary_id: result.public_id || item.cloudinary_id,
      price: req.body.price || item.price,
      sellerName: req.body.sellerName || item.sellerName
    };
    item = await Item.findByIdAndUpdate(req.params.itemId, data, { new: true });
    res.json(item);
  } catch (err) {
    res.json(err);
  }
});

// delete a specific item post
router.delete("/:itemId", async (req, res) => {
  try {
    // find item by id
    const item = await Item.findById(req.params.itemId);
    //  delete img from cloudinary
    await cloudinary.uploader.destroy(item.cloudinary_id);
    // delte user from db
    await item.remove();

    res.json("Item deleted!");
  } catch (err) {
    res.json(err);
  }
});

// search by location
router.get("/search/:query", async (req, res) => {
  try {
    const items = await Item.fuzzySearch(req.params.query);
    console.log(items);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
