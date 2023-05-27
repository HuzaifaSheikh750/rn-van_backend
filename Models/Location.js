const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  userId: String,
  latitude: Number,
  longitude: Number,
});

module.exports = mongoose.model("Location", locationSchema);
