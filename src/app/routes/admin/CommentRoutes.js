const express = require("express");
const router = express.Router();

const comment = require("../../controllers/admin/CommentController");
const jwtMiddleware = require("../../middlewares/jwtMiddleware");

router.get("/list", comment.list);
router.get("/list/comments/course/:id", comment.listByCourse);
router.get("/list/courses", comment.listCourses);
router.get("/list/users", comment.listUsers);
router.post("/create", comment.create);
router.post("/update", comment.update);
router.post("/delete", comment.delete);
router.get("/detail/:id", comment.detail);

module.exports = router;
