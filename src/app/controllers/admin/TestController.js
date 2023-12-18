const Database = require("../../config/database");

class TestController {
  constructor() {
    this.db = Database;
  }

  list = async (req, res) => {
    try {
      const sql = `select * from baikiemtra inner join giangvien on baikiemtra.MaGiangVien = giangvien.MaHoSo inner join video on baikiemtra.MaVideo = video.MaVideo order by MaBaiKT DESC`;
      const results = await this.db.query(sql, []);
      if (results) {
        res.status(200).json({
          data: results,
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

  detail = async (req, res) => {
    try {
      const { id } = req.params;

      const getTest = `SELECT * FROM baikiemtra WHERE MaBaiKT = ?`;
      const exGetTest = await this.db.query(getTest, [id]);

      if (exGetTest.length > 0) {
        const getQuestions = `SELECT * FROM cauhoi WHERE MaBaiKT = ?`;
        const exGetQuestion = await this.db.query(getQuestions, [id]);
        const listQues = [];

        for (const question of exGetQuestion) {
          const getChoices = `SELECT * FROM luachon WHERE MaCauHoi = ?`;
          const exGetChoices = await this.db.query(getChoices, [
            question.MaCauHoi,
          ]);

          const choices = [];
          for (const choice of exGetChoices) {
            choices.push(choice);
          }

          listQues.push({
            ...question,
            Choices: choices,
          });
        }

        const test = {
          MaBaiKT: exGetTest[0].MaBaiKT,
          TenBaiKT: exGetTest[0].TenBaiKT,
          MoTaBaiKT: exGetTest[0].MoTaBaiKT,
          MaGiangVien: exGetTest[0].MaGiangVien,
          MaVideo: exGetTest[0].MaVideo,
          Questions: listQues,
        };

        res.status(200).json({
          data: test,
        });
      } else {
        res.status(404).json({
          ok: false,
          error: "Test not found!",
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

  create = async (req, res) => {
    try {
      const test = req.body;

      const insertTest = `INSERT INTO baikiemtra (TenBaiKT, MoTaBaiKT, MaGiangVien, MaVideo)
          VALUES (?, ?, ?, ?)`;

      const exInsertTest = await this.db.query(insertTest, [
        test.TenBaiKT,
        test.MoTaBaiKT,
        test.MaGiangVien,
        test.MaVideo,
      ]);

      if (exInsertTest.insertId > 0) {
        for (const q of test.Questions) {
          const insertQuestion = `INSERT INTO cauhoi (MaBaiKT, MoTaCauHoi, GoiY)
                                  VALUES (?, ?, ?)`;

          const exInsertQuestion = await this.db.query(insertQuestion, [
            exInsertTest.insertId,
            q.MoTaCauHoi,
            q.GoiY,
          ]);

          if (exInsertQuestion.insertId > 0) {
            for (const c of q.Choices) {
              const insertChoice = `INSERT INTO luachon (MaCauHoi, NoiDung, Dung)
                                  VALUES (?, ?, ?)`;

              const exInsertChoice = await this.db.query(insertChoice, [
                exInsertQuestion.insertId,
                c.NoiDung,
                c.Dung,
              ]);

              if (!exInsertChoice.insertId) {
                res.status(500).json({
                  ok: false,
                  error: "Failed to insert choices",
                });
                return;
              }
            }
          } else {
            res.status(500).json({
              ok: false,
              error: "Failed to insert questions",
            });
            return;
          }
        }
      } else {
        res.status(500).json({
          ok: false,
          error: "Failed to insert test",
        });
        return;
      }

      res.status(200).json({
        ok: true,
        data: true,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    }
  };

  getListTeacher = async (req, res) => {
    try {
      const sql = `SELECT * from giangvien`;
      const data = await this.db.query(sql, []);
      if (data) {
        res.status(200).json({
          data: data,
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

  getListVideo = async (req, res) => {
    try {
      const sql = `SELECT * from video`;
      const data = await this.db.query(sql, []);
      if (data) {
        res.status(200).json({
          data: data,
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

  delete = async (req, res) => {
    try {
      const test = req.body;

      const del = `DELETE FROM baikiemtra WHERE MaBaiKT = ?`;
      const exDel = await this.db.query(del, [test.MaBaiKT]);

      if (exDel.affectedRows > 0) {
        res.status(200).json({
          status: true,
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

  deleteQuestion = async (req, res) => {
    try {
      const cauhoi = req.body;

      const deleteLuachon = `DELETE FROM luachon WHERE MaCauHoi = ?`;
      await this.db.query(deleteLuachon, [cauhoi.MaCauHoi]);

      const del = `DELETE FROM cauhoi WHERE MaCauHoi = ?`;
      const exDel = await this.db.query(del, [cauhoi.MaCauHoi]);

      if (exDel.affectedRows > 0) {
        res.status(200).json({
          status: true,
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

  updateQuestion = async (req, res) => {
    try {
      const cauhoi = req.body;

      const query = `UPDATE cauhoi SET
                      MaBaiKT  = ?,
                      MoTaCauHoi = ?,
                      GoiY  = ?
                  WHERE MaCauHoi   = ?`;

      const execute = await this.db.query(query, [
        cauhoi.MaBaiKT,
        cauhoi.MoTaCauHoi,
        cauhoi.GoiY,
        cauhoi.MaCauHoi,
      ]);
      for (let i = 0; i < cauhoi.Choices.length; i++) {
        const c = cauhoi.Choices[i];

        const getChoicesQuery = `
          SELECT * FROM luachon
          WHERE MaCauHoi = ? AND MaLuaChon = ?
        `;
        const exGetChoices = await this.db.query(getChoicesQuery, [
          cauhoi.MaCauHoi,
          c.MaLuaChon,
        ]);

        if (exGetChoices.length <= 0) {
          const insertChoiceQuery = `
            INSERT INTO luachon (MaCauHoi, NoiDung, Dung)
            VALUES (?, ?, ?)
          `;
          const exInsertChoice = await this.db.query(insertChoiceQuery, [
            cauhoi.MaCauHoi,
            c.NoiDung,
            c.Dung,
          ]);

          if (!exInsertChoice.insertId) {
            return res.status(500).json({
              ok: false,
              error: "Failed to insert choices",
            });
          }
        }
      }

      return res.status(200).json({
        ok: true,
        data: true,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    }
  };

  detailChoice = async (req, res) => {
    try {
      const { id } = req.params;
      const sql = `select * from luachon where MaLuaChon = ?`;
      const results = await this.db.query(sql, [id]);
      if (results) {
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

  updateChoice = async (req, res) => {
    try {
      const luachon = req.body;

      const query = `UPDATE luachon SET
                    MaCauHoi   = ?,
                    NoiDung = ?,
                    Dung  = ?
                    WHERE MaLuaChon    = ?`;

      const excute = await this.db.query(query, [
        luachon.MaCauHoi,
        luachon.NoiDung,
        luachon.Dung,
        luachon.MaLuaChon,
      ]);

      if (excute.affectedRows > 0) {
        res.status(200).json({
          data: true,
        });
      } else {
        res.status(200).json({
          data: false,
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

  deleteChoice = async (req, res) => {
    try {
      const luachon = req.body;

      const del = `DELETE FROM luachon WHERE MaLuaChon = ?`;
      const exDel = await this.db.query(del, [luachon.MaLuaChon]);

      if (exDel.affectedRows > 0) {
        res.status(200).json({
          data: true,
        });
      } else {
        res.status(200).json({
          data: false,
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

module.exports = new TestController();
