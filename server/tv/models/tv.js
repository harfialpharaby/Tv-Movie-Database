const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tvSchema = new Schema({
  title: {
    type: String
  },
  overview: {
    type: String
  },
  posterPath: {
    type: String
  },
  popularity: {
    type: Number
  },
  tags: {
    type: [String]
  }
});

const tv = mongoose.model("tv", tvSchema);
module.exports = tv;
