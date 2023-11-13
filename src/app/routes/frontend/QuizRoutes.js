const express = require("express");
const router = express.Router();

const quiz = require("../../controllers/frontend/QuizController");

router.get("/quiz/:id", quiz.getdata);
// router.get("/quiz/choices", quiz.choices);
router.post("/quiz/checkanswer", quiz.checkAnswer);

module.exports = router;
