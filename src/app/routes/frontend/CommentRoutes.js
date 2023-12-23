const express = require("express");
const router = express.Router();

const home = require("../../controllers/frontend/HomeController");

// router.get("/test/:id", home.home);
// router.get("/home/choices", home.choices);
// router.get("/test/:id", home.home);
// router.get("/home/choices", home.choices);
// router.get("/test/:id", home.home);
// router.get("/home/choices", home.choices);

router.get("/list/new/courses", home.listNewCourses);
router.get("/list/new/blogs", home.listNewBlogs);
router.get("/list/new/teachers", home.listNewTeachers);

module.exports = router;
