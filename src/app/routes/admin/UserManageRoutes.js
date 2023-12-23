const express = require("express");
const router = express.Router();

const usmanage = require("../../controllers/admin/UserCourseManagerController");

router.get("/list/courses/user/:MaNguoiDung", usmanage.listCourseOfUser);

const upload = require("../../middlewares/uploadImgMiddleware");


router.get("/lists/capdo", usmanage.getListLevels);
router.get("/lists/giangvien",  usmanage.getListTeachers);
router.get("/lists/ctdanhmuc", usmanage.getListDetailCategory);

router.get("/detail/:id", usmanage.detail);

router.post(
  "/upload",
  upload.single("image"),
  usmanage.uploadImage
);
router.post("/create",  usmanage.create);
router.post("/delete",  usmanage.delete);

router.post("/update", usmanage.update);

module.exports = router;
