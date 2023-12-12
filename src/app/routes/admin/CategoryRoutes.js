const express = require("express");
const router = express.Router();

const cate = require("../../controllers/admin/CategoryController");
const jwtMiddleware = require("../../middlewares/jwtMiddleware");
const upload = require("../../middlewares/uploadImgMiddleware")

router.get("/list", cate.list);
router.post("/create", cate.create);
router.post("/update", cate.update);
router.post("/delete", cate.delete);
router.get("/detail/:id", cate.detail);
router.post("/upload",upload.single("image"), cate.uploadImage);

module.exports = router;
