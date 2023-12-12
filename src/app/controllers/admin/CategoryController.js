const Database = require("../../config/database");

class CategoryController {
  constructor() {
    this.db = Database;
  }

  list = async (req, res) => {
    try {
      const sql = `select * from danhmuc `;
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

      const sql = `SELECT * from danhmuc where madm = ?`;
      const data = await this.db.query(sql, [id]);
      if (data) {
        res.status(200).json({
          data: data[0],
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
      const category = req.body;

      const query = `INSERT INTO danhmuc( tendm, anhdm)
        VALUES ( ?, ?)`;

      const excute = await this.db.query(query, [
        category.tendm,
        category.anhdm,
      ]);

      if (excute.insertId) {
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

  uploadImage = async (req, res) => {
    try {
      const fileName = req.file ? req.file.filename : "";
      const fileurl = "http://127.0.0.1:8000/uploads/" + fileName;

      res.json({ fileurl });
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
      const category = req.body;

      const del = `DELETE FROM danhmuc WHERE madm = ?`;
      const exDel = await this.db.query(del, [category.MaVideo]);

      if (exDel.affectedRows > 0) {
        res.status(200).json({
          status: true,
          data: exDel,
        });
      } else {
        res.status(404).json({
          status: false,
          error: "Video not found!",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: false,
        error: "Something went wrong!",
      });
    }
  };

  update = async (req, res) => {
    try {
      const category = req.body;

      const query = `UPDATE danhmuc SET
                    tendm = ?,
                    anhdm = ?
                  WHERE madm  = ?`;

      const excute = await this.db.query(query, [
        category.tendm,
        category.anhdm,
        category.madm,
      ]);

      if (excute.affectedRows > 0) {
        res.status(200).json({
          status: true,
        });
      } else {
        res.status(200).json({
          status: false,
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

module.exports = new CategoryController();
