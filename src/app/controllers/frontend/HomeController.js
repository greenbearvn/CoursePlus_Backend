const Database = require("../../config/database");

class HomeController {
  constructor() {
    this.db = Database;
  }

  listNewCourses = async (req, res) => {
    try {
      const sql = `SELECT *
      FROM khoahoc
      INNER JOIN giangvien ON khoahoc.MaGiangVien = giangvien.MaHoSo
      WHERE khoahoc.TrangThai > 0
      ORDER BY khoahoc.id DESC`;
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

   listNewBlogs = async (req, res) => {
    try {
      const sql = `SELECT *
      FROM blog
      INNER JOIN nguoidung ON blog.MaNguoiDung = nguoidung.MaNguoiDung
      WHERE blog.TrangThai > 0
      ORDER BY blog.MaBaiViet DESC
      LIMIT 3`;
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

   listNewTeachers = async (req, res) => {
    try {
      const sql = `SELECT *
      FROM giangvien
      WHERE GiangVien > 0
      ORDER BY MaHoSo DESC`;
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
  

}

module.exports = new HomeController();
