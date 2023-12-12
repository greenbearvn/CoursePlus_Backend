const express = require("express");
const router = express.Router();

const detailCate = require("../../controllers/admin/DetailCategoryController");
const jwtMiddleware = require("../../middlewares/jwtMiddleware");

router.get("/list/:id", detailCate.list);
router.post("/create", detailCate.create);
router.post("/update", detailCate.update);
router.post("/delete", detailCate.delete);
router.get("/detail/:id", detailCate.detail);


module.exports = router;
