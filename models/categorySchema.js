const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "categoryName should be filled"],
  },
  itemId: [
    {
      type: ObjectId,
      ref: "Item",
    },
  ],
});

module.exports = model("Category", categorySchema);
