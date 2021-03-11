const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//   cloud_name: "dcyfpj3na",
//   api_key: "778492886444535",
//   api_secret: "LyViVzpkI1RnyJ-i3JjCHCJlT4k"

module.exports = cloudinary;
