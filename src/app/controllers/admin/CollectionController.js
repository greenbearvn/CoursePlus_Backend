const Database = require("../../config/database");

class CollectionController {
  constructor() {
    this.db = Database;
  }

  list = async (req, res) => {
    try {
      const sql = `select * from bosuutap inner join nguoidung on bosuutap.MaNguoiDung = nguoidung.MaNguoiDung order by MaBST DESC`;
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
      const sql = `select * from bosuutap inner join nguoidung on bosuutap.MaNguoiDung = nguoidung.MaNguoiDung where MaBST = ?`;
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

  listCourses = async (req, res) => {
    try {
      const { id } = req.params;
      const sql = `select * from chitietbst inner join khoahoc on chitietbst.MaKhoaHoc = khoahoc.id where MaBST = ?`;
      const data = await this.db.query(sql, [id]);
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

module.exports = new CollectionController();
