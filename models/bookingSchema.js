const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const bookingSchema = new Schema({
  bookingStartDate: {
    type: Date,
    required: [true, "bookingBookingStartDate should be filled"],
  },
  bookingEndDate: {
    type: Date,
    required: [true, "bookingBookingEndDate should be filled"],
  },
  invoice: {
    type: String,
    required: [true, "bookingInvoice should be filled"],
  },
  payment: {
    proofPayment: {
      type: String,
      required: [true, "bookingProofPayment should be filled"],
    },
    bankFrom: {
      type: String,
      required: [true, "bookingBankFrom should be filled"],
    },
    accountHolder: {
      type: String,
      required: [true, "bookingAccountHolder should be filled"],
    },
    status: {
      type: String,
      required: [true, "bookingStatus should be filled"],
    },
  },
  imageUrl: {
    type: String,
    required: [true, "bookingImageUrl should be filled"],
  },
  total: {
    type: Number,
    required: [true, "bookingTotal should be filled"],
  },
  itemId: {
    _id: {
      type: ObjectId,
      ref: "Item",
      required: [true, "bookingItemId_id should be filled"],
    },
    title: {
      type: String,
      required: [true, "bookingItemIdTitle should be filled"],
    },
    price: {
      type: Number,
      required: [true, "bookingItemIdPice should be filled"],
    },
    duration: {
      type: Number,
      required: [true, "bookingItemIdDuration should be filled"],
    },
  },
  memberId: {
    type: ObjectId,
    ref: "Member",
  },
  bankId: {
    type: ObjectId,
    ref: "Bank",
  },
});

module.exports = model("Booking", bookingSchema);
