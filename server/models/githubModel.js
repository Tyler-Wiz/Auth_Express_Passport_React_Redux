const mongoose = require("mongoose");

const githubSchema = new mongoose.Schema({
  githubId: { type: Number },
});

module.exports = mongoose.model("Github", githubSchema);
