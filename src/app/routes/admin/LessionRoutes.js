const express = require("express");
const router = express.Router();

const lession = require("../../controllers/admin/LessionController");
const jwtMiddleware = require("../../middlewares/jwtMiddleware");

router.get("/list/:makhoahoc", lession.list);
router.post("/create", lession.create);
router.post("/update", lession.update);
router.post("/delete", lession.delete);
router.get("/detail/:id", lession.detail);
router.get("/courses", lession.listCourses);

module.exports = router;
