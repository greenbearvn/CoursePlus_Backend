const Database = require("../../config/database");
const bcrypt = require("bcrypt");

class ProfileController {
  constructor() {
    this.db = Database;
  }

  list = async (req, res) => {
    try {
      const sql = `select * from giangvien inner join danhmuc on giangvien.MaDanhMuc = danhmuc.madm order by MaHoSo DESC`;
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

  listUser = async (req, res) => {
    try {
      const sql = `select * from nguoidung`;
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

  listCategory = async (req, res) => {
    try {
      const sql = `select * from danhmuc`;
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

      const sql = `SELECT * from giangvien where MaHoSo = ?`;
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

  create = async (req, res) => {
    try {
      const profile = req.body;

      const query = `INSERT INTO giangvien (MaHoSo , TenHoSo, Email,SoDienThoai,AnhDaiDien,MoTa,MaDanhMuc ,GiangVien)
        VALUES ( ?, ?,?, ?,?, ?,?,?)`;

      const excute = await this.db.query(query, [
        profile.MaHoSo,
        profile.TenHoSo,
        profile.Email,
        profile.SoDienThoai,
        profile.AnhDaiDien,
        profile.MoTa,
        profile.MaDanhMuc,
        profile.GiangVien,
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
      const profile = req.body;

      const del = `DELETE FROM giangvien WHERE MaHoSo = ?`;
      const exDel = await this.db.query(del, [profile.MaHoSo]);

      if (exDel.affectedRows > 0) {
        res.status(200).json({
          status: true,
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

  
}

module.exports = new ProfileController();
