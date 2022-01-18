const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const memberSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "memberFirstName should be filled"],
  },
  lastName: {
    type: String,
    required: [true, "memberLastName should be filled"],
  },
  email: {
    type: String,
    required: [true, "memberEmail should be filled"],
  },
  phoneNumber: {
    type: String,
    required: [true, "memberPhoneNumber should be filled"],
  },
});

module.exports = model("Member", memberSchema);
