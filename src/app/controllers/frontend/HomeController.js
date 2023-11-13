const Database = require("../../config/database");

class HomeController {
  constructor() {
    this.db = Database;
  }

  home = async (req, res) => {
    try {
      const { id } = req.params;
      const sql = `SELECT * FROM sanpham where maSanPham = '${id}'`;
      const results = await this.db.query(sql, []);
      if (results) {
        console.log(results);
      }
      res.status(200).json({
        ok: true,
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

  choices = async (req, res) => {
    try {
      const sql = `select * from luachon`;
      const results = await this.db.query(sql, []);

      res.status(200).json({
        ok: true,
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

  getVideo = async (req, res) => {
    try {
      const {  id } = req.params;
      console.log(id)
      const sql = `SELECT * FROM video where MaVideo = '${id}' `;
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
}

module.exports = new HomeController();
