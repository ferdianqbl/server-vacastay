const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "categoryName should be filled"],
  },
});

module.exports = model("Category", categorySchema);
