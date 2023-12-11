const Database = require("../../config/database");
const bcrypt = require("bcrypt");

class NguoiDungController {
  constructor() {
    this.db = Database;
  }

  list = async (req, res) => {
    try {
      const sql = `select * from nguoidung order by MaNguoiDung DESC`;
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

      const sql = `SELECT nguoidung.* from nguoidung where MaNguoiDung = ?`;
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
      const nguoidung = req.body;

      const hashedPassword = await bcrypt.hash(nguoidung.MatKhau, 10);

      nguoidung.MatKhau = hashedPassword;

      const query = `INSERT INTO nguoidung ( TenNguoiDung, Email,MatKhau,Quyen)
        VALUES ( ?, ?,?, ?)`;

      const excute = await this.db.query(query, [
        nguoidung.TenNguoiDung,
        nguoidung.Email,
        nguoidung.MatKhau,
        nguoidung.Quyen,
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

  delete = async (req, res) => {
    try {
      const nguoidung = req.body;

      const del = `DELETE FROM nguoidung WHERE id = ?`;
      const exDel = await this.db.query(del, [nguoidung.MaNguoiDung]);

      if (exDel.affectedRows > 0) {
        const sql = `select * from nguoidung order by MaNguoiDung DESC`;
        const data = await this.db.query(sql, []);

        if (data) {
          res.status(200).json({
            status: true,
            data: data,
          });
        }
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
      const nguoidung = req.body;
      
      const hashedPassword = await bcrypt.hash(nguoidung.MatKhau, 10);

      nguoidung.MatKhau = hashedPassword;

      const query = `UPDATE nguoidung SET
                      TenNguoiDung = ?,
                      Email = ?,
                      MatKhau = ?,
                      Quyen = ?
                  WHERE MaNguoiDung = ?`;

      const excute = await this.db.query(query, [
        nguoidung.TenNguoiDung,
        nguoidung.Email,
        nguoidung.MatKhau,
        nguoidung.Quyen,
        nguoidung.MaNguoiDung
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

module.exports = new NguoiDungController();
