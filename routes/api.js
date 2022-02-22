const express = require("express");
const router = express.Router();
const {
  landingPage,
  detailPage,
  bookingPage,
} = require("../controllers/apiController");
// const { uploadBank } = require("../middlewares/multerBank");
const { uploadBooking } = require("../middlewares/multerBooking");
// const { uploadFeature } = require("../middlewares/multerFeature");
// const { uploadActivity } = require("../middlewares/multerActivity");
// const { uploadMultipleItem } = require("../middlewares/multerItem");

router.get("/landing-page", landingPage);
router.get("/detail-page/:id", detailPage);
router.post("/booking-page", uploadBooking, bookingPage);

module.exports = router;
