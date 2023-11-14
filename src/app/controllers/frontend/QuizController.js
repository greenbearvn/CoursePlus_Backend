const Database = require("../../config/database");

class QuizController {
  constructor() {
    this.db = Database;
  }

  getdata = async (req, res) => {
    try {
      const { id } = req.params;
      const sql = `SELECT * FROM cauhoi where MaBaiKT  = '${id}'`;
      const results = await this.db.query(sql, []);

      const queryChoices = `select * from luachon`;
      const choices = await this.db.query(queryChoices, []);

      // Loop through each question
      for (const question of results) {
        question.choices = [];

        // Find choices for the current question
        const questionChoices = choices.filter(
          (choice) => choice.MaCauHoi === question.MaCauHoi
        );

        // Add choices to the question object
        question.choices = questionChoices;
      }

      

      res.status(200).json({
        data: results,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    }
  };

  checkAnswer = async (req, res) => {
    try {
      const { macauhoi, sochon } = req.body;

      const checked = `SELECT * FROM cauhoi where MaCauHoi = '${macauhoi}' and DapAn = '${sochon}'`;
      const abc = await this.db.query(checked, []);

      if (abc[0]) {
        if (macauhoi == abc[0].MaCauHoi && sochon == abc[0].DapAn) {
          res.status(200).json({
            Diem: abc[0].Diem,
            Dung: true,
          });
        }
      } else {
        res.status(200).json({
          Diem: 0,
          Dung: false,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    }
  };
}

module.exports = new QuizController();