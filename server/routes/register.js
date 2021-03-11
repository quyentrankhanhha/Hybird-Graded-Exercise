const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { registerValidation } = require("../schema");

router.post("/", async (req, res) => {
  // validate the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(409).send("Username or Email already exit");

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create a new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    // return user: id
    // res.send({ user: user._id });
    res.json({ message: "Create user successfully!" });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
