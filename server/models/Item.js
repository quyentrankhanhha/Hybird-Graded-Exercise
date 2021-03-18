const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  description: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  category: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  location: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  imagine: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  cloudinary_id: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sellerId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
  // sellerName: {
  //   type: String,
  //   required: true,
  //   min: 6,
  //   max: 255
  // },
  // sellerEmail: {
  //   type: String,
  //   required: true,
  //   min: 6,
  //   max: 255
  // }
});
itemSchema.plugin(mongoose_fuzzy_searching, {
  fields: ["title", "category", "location"]
});
module.exports = mongoose.model("Item", itemSchema);
