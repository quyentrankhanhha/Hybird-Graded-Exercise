const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema(
  {
    request: String,
    location: String
  },
  {
    collection: "items"
  }
);

module.exports = mongoose.model("Search", searchSchema);
