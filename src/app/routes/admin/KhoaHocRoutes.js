const express = require("express");
const router = express.Router();

const khoahoc = require("../../controllers/admin/KhoaHocController");
const jwtMiddleware = require("../../middlewares/jwtMiddleware");

const upload = require("../../middlewares/uploadImgMiddleware");

// router.get("/lists", jwtMiddleware,khoahoc.lists);
router.get("/lists", khoahoc.lists);

router.get("/lists/capdo", jwtMiddleware, khoahoc.getListLevels);
router.get("/lists/giangvien", jwtMiddleware, khoahoc.getListTeachers);
router.get("/lists/ctdanhmuc", jwtMiddleware, khoahoc.getListDetailCategory);

router.get("/detail/:id", khoahoc.detail);

router.post(
  "/upload",
  upload.single("image"),
  jwtMiddleware,
  khoahoc.uploadImage
);
router.post("/create", jwtMiddleware, khoahoc.create);
router.post("/delete", jwtMiddleware, khoahoc.delete);

router.post("/update", jwtMiddleware, khoahoc.update);

module.exports = router;
