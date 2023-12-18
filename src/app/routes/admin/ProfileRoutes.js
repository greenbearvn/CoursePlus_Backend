const express = require("express");
const router = express.Router();

const profile = require("../../controllers/admin/ProfileController");
const jwtMiddleware = require("../../middlewares/jwtMiddleware");
const upload = require("../../middlewares/uploadImgMiddleware");

router.get("/list", profile.list);
router.get("/list/users", profile.listUser);
router.get("/list/categories", profile.listCategory);
router.post("/create", profile.create);
// router.post("/update", profile.create);
router.post("/delete", profile.delete);
router.get("/detail/:id", profile.detail);
router.post(
  "/upload",
  upload.single("image"),
  profile.uploadImage
);

module.exports = router;
