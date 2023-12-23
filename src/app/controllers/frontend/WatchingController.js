const Database = require("../../config/database");

class WatchingController {
  constructor() {
    this.db = Database;
  }

  getVideo = async (req, res) => {
    try {
      const { id } = req.params;

      const sql = `SELECT * FROM video where MaVideo = '${id}' `;
      const results = await this.db.query(sql, []);
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

  getQuestions = async (req, res) => {
    try {
      const { mavideo } = req.params;
      const sql = `SELECT * FROM baikiemtra where MaVideo = '${mavideo}' `;
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

  getAllTests = async (req, res) => {
    try {
      const { id } = req.params;
      const sql = `SELECT * FROM baikiemtra 
      inner join video on baikiemtra.MaVideo = video.MaVideo
      inner join baihoc on video.MabaiHoc = baihoc.MaBaiHoc 
       where baihoc.MaKhoaHoc = ?
       oder by MaBaiKT ASC`;
      const results = await this.db.query(sql, [id]);
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
}

module.exports = new WatchingController();
