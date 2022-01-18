const express = require("express");
const router = express.Router();
const {
  viewDashboard,
  viewCategory,
  viewBank,
} = require("../controllers/adminController");

router.get("/dashboard", viewDashboard);
router.get("/category", viewCategory);
router.get("/bank", viewBank);

module.exports = router;
