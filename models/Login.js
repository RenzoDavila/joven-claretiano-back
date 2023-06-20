const mongoose = require("mongoose");

const schema = mongoose.Schema({
  user: String,
  pass: String,
});

module.exports = mongoose.model("Login", schema);
