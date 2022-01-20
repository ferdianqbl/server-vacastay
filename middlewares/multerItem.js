const multer = require("multer");
const path = require("path");
const fs = require("fs");
// import uuid from "uuid/v4";

// store multiple multer
const storageMultiple = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir = "public/images/item"; // directory to store images
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
const uploadMultipleItem = multer({
  storage: storageMultiple,
  limits: { fileSize: 5000000 }, // limit size image
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("image", 12);

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

module.exports = { uploadMultipleItem };
