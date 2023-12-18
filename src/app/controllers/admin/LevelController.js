const Database = require("../../config/database");

class LevelController {
  constructor() {
    this.db = Database;
  }

  list = async (req, res) => {
    try {
      const sql = `select * from capdo order by MaCapDo DESC`;
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

      const sql = `SELECT * from capdo where MaCapDo = ?`;
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
      const level = req.body;

      const query = `INSERT INTO capdo (TenCapDo  )
        VALUES ( ?)`;

      const excute = await this.db.query(query, [level.TenCapDo]);

      if (excute.insertId) {
        res.status(200).json({
          level: true,
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
      const level = req.body;

      const del = `DELETE FROM blog WHERE MaCapDo = ?`;
      const exDel = await this.db.query(del, [level.MaCapDo]);

      if (exDel.affectedRows > 0) {
        res.status(200).json({
          data: true,
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

  update = async (req, res) => {
    try {
      const level = req.body;

      const query = `UPDATE capdo SET
                    TenCapDo = ?
                  WHERE MaCapDo  = ?`;

      const excute = await this.db.query(query, [level.TenCapDo, level.MaCapDo]);

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
}

module.exports = new LevelController();
