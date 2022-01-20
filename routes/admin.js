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
  addBank,
  editBank,
  deleteBank,
} = require("../controllers/adminController");
const { uploadBank } = require("../middlewares/multerBank");

router.get("/dashboard", viewDashboard);

router.get("/category", viewCategory);
router.post("/category", addCategory);
router.put("/category", editCategory);
router.delete("/category/:id", deleteCategory);

router.get("/bank", viewBank);
router.post("/bank", uploadBank, addBank);
router.put("/bank", uploadBank, editBank);
router.delete("/bank/:id", deleteBank);

router.get("/item", viewItem);

router.get("/booking", viewBooking);

module.exports = router;
