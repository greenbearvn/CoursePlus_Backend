const express = require("express");
const router = express.Router();

const detail = require("../../controllers/frontend/DetailController");

router.get("/detail/:id", detail.detail);
router.get("/detail/lessions/:id", detail.getLession);
router.get("/detail/lessions/videos/:id", detail.getVideo);
router.get("/detail/questions/:id", detail.getListQuestions);
router.get("/detail/teacher/:id", detail.getTeachersOfCour);
router.get("/detail/comments/:id", detail.getAllComments);
router.get("/detail/courses/recommend/:id", detail.getRelateCourses);
router.get("/detail/check/bought/:id", detail.checkBought);
module.exports = router;
