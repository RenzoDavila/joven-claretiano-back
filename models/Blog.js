const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  views: Number,
  content: [{
          description: Number,
          text: String,
          multimediaType: String,
          multimediaPosition: String,
          imagePath: String
      }],
  tag: String,
  tagDesc: String,
  dateEdited: Date,
  dateCreated: Date,
  principalImagePath: String,
  state: String,
});

module.exports = mongoose.model("Blog", schema);
