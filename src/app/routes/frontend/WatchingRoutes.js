const express = require("express");
const router = express.Router();

const watching = require("../../controllers/frontend/WatchingController");

router.get("/video/detail/:id", watching.getVideo);

router.get("/video/questions/:mavideo", watching.getQuestions);

router.get("/video/all/tests/:id", watching.getAllTests);

module.exports = router;
