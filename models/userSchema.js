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

userSchema.pre("save", async (next) => {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

module.exports = model("User", userSchema);
