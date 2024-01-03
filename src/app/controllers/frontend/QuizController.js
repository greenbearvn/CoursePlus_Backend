const Database = require("../../config/database");

class QuizController {
  constructor() {
    this.db = Database;
  }

  getTest = async (req, res) => {
    try {
      const { id } = req.params;
      const sql = `SELECT * FROM baikiemtra where MaBaiKT  = '${id}'`;
      const results = await this.db.query(sql, []);

      if (results.length > 0) {
        res.status(200).json({
          data: results[0],
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
      const  choice  = req.body;


      const checked = `SELECT * FROM luachon where MaLuaChon = ? `;
      const abc = await this.db.query(checked, [choice.MaLuaChon]);

      if (abc[0].Dung === 1) {
        const getQuesion = `SELECT * FROM cauhoi where MaCauHoi = ? `;
        const exGetQuestion = await this.db.query(getQuesion, [
          abc[0].MaCauHoi,
        ]);

        if (exGetQuestion.length > 0) {
          res.status(200).json({
           
            Dung: true,
          });
        }
      } else {
        res.status(200).json({
   
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

  saveTested = async (req, res) => {
    try {
      const bailam = req.body;

      const user = req.session.user || {};

      const qrInserTested = `INSERT INTO bailam (MaNguoiDung, MaBaiKT, ThoiGianNop, ChinhXac)
        VALUES (?, ?, ?, ?)`;

      const ex = await this.db.query(qrInserTested, [
        user.MaNguoiDung,
        bailam.MaBaiKT,
        bailam.ThoiGianNop,
        bailam.ChinhXac,
      ]);

      if (ex.insertId > 0) {
        res.status(200).json({
          alert: "Ghi điểm thành công!",
        });
      } else {
        res.status(200).json({
          alert: "Ghi điểm không thành công!",
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
