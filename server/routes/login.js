const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { loginValidation } = require("../schema");

router.post("/", async (req, res) => {
  // validate the data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error);

  // check the email exists
  const user = await User.findOne({
    email: req.body.email
  });
  if (!user) return res.status(400).send("Email is not found");

  // password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  // create and assgin a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.setHeader("auth-token", token);
  res.status(200).send("Logged in!");
});

module.exports = router;
