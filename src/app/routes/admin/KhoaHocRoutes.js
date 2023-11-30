const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const khoahoc = require("../../controllers/admin/KhoaHocController");
const jwtMiddleware = require("../../middlewares/jwtMiddleware")

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


router.get("/lists", jwtMiddleware,khoahoc.lists);

router.get("/lists/capdo",jwtMiddleware, khoahoc.getListLevels);
router.get("/lists/giangvien", khoahoc.getListTeachers);
router.get("/lists/ctdanhmuc", khoahoc.getListDetailCategory);

router.get("/detail/:id", khoahoc.detail);


router.post("/upload", upload.single("image"), khoahoc.uploadImage);
router.post("/create", khoahoc.create);
router.post("/delete",jwtMiddleware, khoahoc.delete);

router.post("/update", khoahoc.update);

module.exports = router;
