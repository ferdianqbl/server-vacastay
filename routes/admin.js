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
  showEditItem,
  editItem,
  deleteItem,
  viewDetailItem,
  addFeature,
  editFeature,
  deleteFeature,
  addActivity,
  editActivity,
  deleteActivity,
  viewLogin,
  actionsLogin,
  viewSignUp,
  addUser,
} = require("../controllers/adminController");
const { uploadBank } = require("../middlewares/multerBank");
const { uploadFeature } = require("../middlewares/multerFeature");
const { uploadActivity } = require("../middlewares/multerActivity");
const { uploadMultipleItem } = require("../middlewares/multerItem");

router.get("/signup", viewSignUp);
router.post("/signup", addUser);

router.get("/login", viewLogin);
router.post("/login", actionsLogin);

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
router.get("/item/:id", showEditItem);
router.get("/item/image/:id", showImageItem);
router.post("/item", uploadMultipleItem, addItem);
router.put("/item/:id", uploadMultipleItem, editItem);
router.delete("/item/:id", deleteItem);

router.get("/item/detail-item/:itemId", viewDetailItem);
router.post("/item/add/feature", uploadFeature, addFeature);
router.put("/item/update/feature", uploadFeature, editFeature);
router.delete(
  "/item/delete/feature/:itemId/:featureId",
  uploadFeature,
  deleteFeature
);

router.post("/item/add/activity", uploadActivity, addActivity);
router.put("/item/update/activity", uploadActivity, editActivity);
router.delete(
  "/item/delete/activity/:itemId/:activityId",
  uploadActivity,
  deleteActivity
);

router.get("/booking", viewBooking);

module.exports = router;
