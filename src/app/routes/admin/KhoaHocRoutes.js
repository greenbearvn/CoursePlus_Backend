const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const khoahoc = require("../../controllers/admin/KhoaHocController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Store uploaded files in the 'uploads' folder
  },  
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), khoahoc.uploadImage);
router.post("/create", khoahoc.create);

module.exports = router;
