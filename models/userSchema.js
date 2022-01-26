const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "username should be filled"],
  },
  password: {
    type: String,
    required: [true, "password should be filled"],
  },
});

module.exports = model("User", userSchema);
