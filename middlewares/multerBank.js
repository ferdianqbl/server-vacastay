const multer = require("multer");
const path = require("path");
const fs = require("fs");
// import uuid from "uuid/v4";

// store multiple multer
const storageMultiple = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir = "public/images/bank"; // directory to store images
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // name the image
  },
});

// upload multiple multer
const uploadMultipleBank = multer({
  storage: storageMultiple,
  limits: { fileSize: 5000000 }, // limit size image
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("image", 12);

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir = "public/images/bank"; // directory to store images
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadBank = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");

// Check file Type
function checkFileType(file, cb) {
  // Allowed ext
  const fileTypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: Images Only !!!");
  }
}

module.exports = { uploadMultipleBank, uploadBank };
