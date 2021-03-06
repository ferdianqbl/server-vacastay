const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const itemSchema = new Schema({
  title: {
    type: String,
    required: [true, "itemTitle should be filled"],
  },
  price: {
    type: Number,
    required: [true, "itemPrice should be filled"],
  },
  country: {
    type: String,
    default: "Indonesia",
  },
  city: {
    type: String,
    required: [true, "itemCity should be filled"],
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  unit: {
    type: String,
    default: "night",
  },
  sumBooking: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: [true, "itemDescription should be filled"],
  },
  categoryId: {
    type: ObjectId,
    ref: "Category",
  },
  imageId: [
    {
      type: ObjectId,
      ref: "Image",
    },
  ],
  featureId: [
    {
      type: ObjectId,
      ref: "Feature",
    },
  ],
  activityId: [
    {
      type: ObjectId,
      ref: "Activity",
    },
  ],
});

module.exports = model("Item", itemSchema);
