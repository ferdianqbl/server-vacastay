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
  addItem,
  showImageItem,
} = require("../controllers/adminController");
const { uploadBank } = require("../middlewares/multerBank");
const { uploadMultipleItem } = require("../middlewares/multerItem");

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
router.get("/item/image/:id", showImageItem);
router.post("/item", uploadMultipleItem, addItem);

router.get("/booking", viewBooking);

module.exports = router;
