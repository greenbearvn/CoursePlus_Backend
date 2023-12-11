const express = require("express");
const router = express.Router();

const video = require("../../controllers/admin/VideoController");
const jwtMiddleware = require("../../middlewares/jwtMiddleware");

router.get("/list/:makhoahoc", video.list);
router.post("/create", video.create);
router.post("/update", video.update);
router.post("/delete", video.delete);
router.get("/detail/:id", video.detail);
router.get("/lessions", video.listLession);

module.exports = router;
