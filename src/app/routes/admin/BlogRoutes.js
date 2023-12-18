const express = require("express");
const router = express.Router();

const blog = require("../../controllers/admin/BlogController");
const jwtMiddleware = require("../../middlewares/jwtMiddleware");
const upload = require("../../middlewares/uploadImgMiddleware");

router.get("/list", blog.list);
router.get("/list/users", blog.listUser);
router.get("/list/categories", blog.listCategory);
router.post("/create", blog.create);
router.post("/update", blog.update);
router.post("/delete", blog.delete);
router.get("/detail/:id", blog.detail);
router.post("/upload", upload.single("image"), blog.uploadImage);

module.exports = router;
