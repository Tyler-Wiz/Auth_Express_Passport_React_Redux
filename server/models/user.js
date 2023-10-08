const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 40,
    unique: true,
  },
  password: { type: String, required: true, minLength: 6, maxLength: 1024 },
});

module.exports = mongoose.model("User", userSchema);
