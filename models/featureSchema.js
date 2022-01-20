const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const featureSchema = new Schema({
  name: {
    type: String,
    required: [true, "featureName should be filled"],
  },
  qty: {
    type: Number,
    required: [true, "featureQty should be filled"],
  },
  imageUrl: {
    type: String,
    required: [true, "featureImageUrl should be filled"],
  },
  itemId: {
    type: ObjectId,
    ref: "Item",
  },
});

module.exports = model("Feature", featureSchema);
