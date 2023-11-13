const Database = require("../../config/database");
const nguoidung = require("../../models/nguoidung");

const bcrypt = require("bcrypt");

class AccountController {
  constructor() {
    this.db = Database;
  }

  register = async (req, res) => {
    try {
      const nguoidung = req.body;

      const saltRounds = 10;

      const salt = await bcrypt.genSalt(saltRounds);

      const hashPass = await bcrypt.hash(nguoidung.MatKhau, salt);

      nguoidung.MatKhau = hashPass;
      nguoidung.Quyen = 0;

      const query = `INSERT INTO nguoidung (TenNguoiDung, Email, MatKhau, Quyen)
        VALUES (?, ?, ?, ?)`;

      const execute = await this.db.query(query, [
        nguoidung.TenNguoiDung,
        nguoidung.Email,
        nguoidung.MatKhau,
        nguoidung.Quyen,
      ]);

      if (execute.insertId) {
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

module.exports = new AccountController();
