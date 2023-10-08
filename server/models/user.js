const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minLength: 3, maxLength: 30 },
  password: { type: String, required: true, minLength: 6, maxLength: 1024 },
});

module.exports = mongoose.model("User", userSchema);
