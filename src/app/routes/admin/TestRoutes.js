const express = require("express");
const router = express.Router();

const test = require("../../controllers/admin/TestController");
const jwtMiddleware = require("../../middlewares/jwtMiddleware");

router.get("/list", test.list);
router.post("/create", test.create);

router.post("/delete", test.delete);
router.post("/delete/choice", test.deleteChoice);
router.post("/delete/question", test.deleteQuestion);
router.get("/detail/:id", test.detail);
router.post("/update/choice", test.updateChoice);
router.post("/update/question", test.updateQuestion);
router.get("/list/teachers", test.getListTeacher);
router.get("/list/videos", test.getListVideo);

// router.post("/insert/message", convention.insertMessages);
// router.post("/insert/userconvention", convention.insertUser);
// router.get("/list/user", convention.getListUser);
// router.get("/list/userconvention/:id", convention.getListUserConvention);

module.exports = router;
