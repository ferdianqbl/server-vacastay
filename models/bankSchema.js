const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bankSchema = new Schema({
  nameBank: {
    type: String,
    required: [true, "bankNameBank should be filled"],
  },
  accountNumber: {
    type: String,
    required: [true, "bankAccountNumber should be filled"],
  },
  accountName: {
    type: String,
    required: [true, "bankAccountName should be filled"],
  },
});

module.exports = model("Bank", bankSchema);
