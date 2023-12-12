const Database = require("../../config/database");

class DetailCategoryController {
  constructor() {
    this.db = Database;
  }

  list = async (req, res) => {
    try {
      const { id } = req.params;
      const sql = `select * from chitietdanhmuc where madm = ? `;
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

  detail = async (req, res) => {
    try {
      const { id } = req.params;
      const sql = `SELECT * from chitietdanhmuc where MaCTDM = ?`;
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
      const dCate = req.body;

      const query = `INSERT INTO chitietdanhmuc( TenCTDM, madm)
        VALUES ( ?, ?)`;

      const excute = await this.db.query(query, [dCate.TenCTDM, dCate.madm]);

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

  delete = async (req, res) => {
    try {
      const dCate = req.body;

      const del = `DELETE FROM chitietdanhmuc WHERE MaCTDM = ?`;
      const exDel = await this.db.query(del, [dCate.MaCTDM]);

      if (exDel.affectedRows > 0) {
        res.status(200).json({
          status: true,
        });
      } else {
        res.status(404).json({
          status: false,
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
      const dCate = req.body;

      const query = `UPDATE chitietdanhmuc SET
                    TenCTDM = ?,
                    madm = ?
                  WHERE MaCTDM  = ?`;

      const excute = await this.db.query(query, [
        dCate.TenCTDM,
        dCate.madm,
        dCate.MaCTDM,
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

module.exports = new DetailCategoryController();
