const express = require("express");
const router = express.Router();
const { landingPage, detailPage } = require("../controllers/apiController");
// const { uploadBank } = require("../middlewares/multerBank");
// const { uploadFeature } = require("../middlewares/multerFeature");
// const { uploadActivity } = require("../middlewares/multerActivity");
// const { uploadMultipleItem } = require("../middlewares/multerItem");

router.get("/landing-page", landingPage);
router.get("/detail-page/:id", detailPage);

module.exports = router;
