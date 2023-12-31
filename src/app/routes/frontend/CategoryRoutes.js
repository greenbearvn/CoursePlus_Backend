const express = require("express");
const router = express.Router();

const category = require("../../controllers/frontend/CategoryController");

router.get("/list/cates", category.getListCate);
router.post("/list/courses", category.getLitCourses);

module.exports = router;
