const express = require("express");
const router = express.Router();
const {
  viewDashboard,
  viewCategory,
} = require("../controllers/adminController");

router.get("/dashboard", viewDashboard);
router.get("/category", viewCategory);

module.exports = router;
