const express = require("express");
const router = express.Router();

const watching = require("../../controllers/frontend/WatchingController");

router.get("/video/detail/:id", watching.getVideo);

router.get("/video/questions/:mavideo", watching.getQuestions);


module.exports = router;
