const mongoose = require("mongoose");
const { Schema, model } = mongoose;

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
});

module.exports = model("Activity", activitySchema);
