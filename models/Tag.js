const mongoose = require("mongoose");

const schema = mongoose.Schema({
  description: String,
  color: String,
  title: String,
});

module.exports = mongoose.model("Tag", schema);
