const express = require("express");
const router = express.Router();
const {
  viewDashboard,
  viewCategory,
  viewBank,
  viewItem,
  viewBooking,
} = require("../controllers/adminController");

router.get("/dashboard", viewDashboard);
router.get("/category", viewCategory);
router.get("/bank", viewBank);
router.get("/item", viewItem);
router.get("/booking", viewBooking);

module.exports = router;
