const express = require("express");
const router = express.Router();

const profile = require("../../controllers/frontend/ProfileController");
const upload = require("../../middlewares/uploadImgMiddleware");

router.get("/person/:id", profile.getProfile);
router.get("/list/cateogories", profile.listCategory);
router.post("/upload", upload.single("image"), profile.uploadImage);
router.post("/create", profile.create);
router.post("/update", profile.update);
router.post("/create/convention", profile.createConven);

module.exports = router;
