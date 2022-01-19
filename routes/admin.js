const express = require("express");
const router = express.Router();
const {
  viewDashboard,
  viewCategory,
  viewBank,
  viewItem,
  viewBooking,
  addCategory,
  editCategory,
  deleteCategory,
} = require("../controllers/adminController");

router.get("/dashboard", viewDashboard);

router.get("/category", viewCategory);
router.post("/category", addCategory);
router.put("/category", editCategory);
router.delete("/category/:id", deleteCategory);

router.get("/bank", viewBank);

router.get("/item", viewItem);

router.get("/booking", viewBooking);

module.exports = router;
