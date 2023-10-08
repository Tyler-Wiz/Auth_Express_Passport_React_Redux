const express = require("express");
const joi = require("joi");
const User = require("../models/user");
const { passwordHash } = require("../utils/bcrypt");

// call express
const router = express.Router();

router.post("/", async (req, res) => {
  // Validate Schema
  const schema = joi.object({
    username: joi.string().min(3).max(40).required(),
    password: joi.string().min(6).max(1024).required(),
  });

  // check for Schema error
  const { error } = schema.validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  // Check if user already exist
  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User Already Exist");

  // hash the password
  const hashedPassword = await passwordHash(req.body.password, 10);

  // Create New User in database
  const newUser = new User({
    username: req.body.username,
    password: hashedPassword,
  });
  const token = await newUser.save();
  // Send the user object from database to client
  res.send(token);
});

module.exports = router;
