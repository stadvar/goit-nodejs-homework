const path = require("path");
// const fs = require("fs/promises");
require("dotenv").config();
const multer = require("multer");

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);
// const IMG_DIR = path.join(process.cwd(), "public", "images");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    // cb(null, file.fieldname + "-" + Date.now());
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
      return;
    }
    cb(null, false);
  },
});
module.exports = upload;
