const mongoose = require("mongoose");

const discordSchema = new mongoose.Schema({
  discordId: { type: Number },
});

module.exports = mongoose.model("Discord", discordSchema);
