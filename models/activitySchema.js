const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const activitySchema = new Schema({
  name: {
    type: String,
    required: [true, "activityName should be filled"],
  },
  type: {
    type: String,
    required: [true, "activityType should be filled"],
  },
  imageUrl: {
    type: String,
    required: [true, "activityImageUrl should be filled"],
  },
  isPopular: {
    type: Boolean,
  },
  itemId: {
    type: ObjectId,
    ref: "Item",
  },
});

module.exports = model("Activity", activitySchema);
