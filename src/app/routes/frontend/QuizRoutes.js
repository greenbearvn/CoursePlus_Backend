const express = require("express");
const router = express.Router();

const quiz = require("../../controllers/frontend/QuizController");

router.get("/test/detail/:id", quiz.getTest);

router.get("/quiz/:id", quiz.getdata);
// router.get("/quiz/choices", quiz.choices);
router.post("/quiz/checkanswer", quiz.checkAnswer);

router.post("/quiz/assignment/save", quiz.saveTested);

module.exports = router;
