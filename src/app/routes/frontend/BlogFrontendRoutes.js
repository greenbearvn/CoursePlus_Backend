const express = require("express");
const router = express.Router();

const blog = require("../../controllers/frontend/BlogFrontendController");
const upload = require("../../middlewares/uploadImgMiddleware")

router.post("/list/blogs", blog.list);
router.get("/list/categories", blog.getListCate);
router.get("/list/categories", blog.getListCate);
router.post("/upload", upload.single("image"), blog.uploadImage);
router.post("/create", blog.create);
router.get("/detail/:id", blog.detail);

module.exports = router;
