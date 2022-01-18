const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const imageSchema = new Schema({
  imageUrl: {
    type: String,
    required: [true, "imageUrl should be filled"],
  },
});

module.exports = model("Image", imageSchema);
