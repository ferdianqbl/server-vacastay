const express = require("express");
const router = express.Router();
const { landingPage } = require("../controllers/apiController");
// const { uploadBank } = require("../middlewares/multerBank");
// const { uploadFeature } = require("../middlewares/multerFeature");
// const { uploadActivity } = require("../middlewares/multerActivity");
// const { uploadMultipleItem } = require("../middlewares/multerItem");

router.get("/landing-page", landingPage);

module.exports = router;
