const express = require("express");
const router = express.Router();
const { viewDashboard } = require("../controllers/adminController");

router.get("/dashboard", viewDashboard);

module.exports = router;
