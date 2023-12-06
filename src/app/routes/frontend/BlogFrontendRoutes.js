const express = require("express");
const router = express.Router();

const blog = require("../../controllers/frontend/BlogFrontendController");

router.post("/list/blogs", blog.list);
router.get("/list/categories", blog.getListCate);


module.exports = router;
