const Database = require("../../config/database");

class CommentController {
  constructor() {
    this.db = Database;
  }

  list = async (req, res) => {
    try {
      const sql = `select * from binhluan 
      inner join khoahoc on binhluan.MaKhoaHoc = khoahoc.id 
      inner join nguoidung on binhluan.MaNguoiDung = nguoidung.MaNguoiDung  
      order by MaBinhLuan DESC`;
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

  listByCourse = async (req, res) => {
    try {
      const { id } = req.params;
      const sql = `select * from binhluan
      inner join khoahoc on binhluan.MaKhoaHoc = khoahoc.id 
      inner join nguoidung on binhluan.MaNguoiDung = nguoidung.MaNguoiDung  
       where MaKhoaHoc = ? order by MaBinhLuan`;
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
      const sql = `select * from binhluan where MaBinhLuan = ?`;
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

  create = async (req, res) => {
    try {
      const binhluan = req.body;

      const query = `INSERT INTO binhluan (MaKhoaHoc , MaNguoiDung, NoiDung,ThoiGian)
        VALUES ( ?, ?,?, ?,?, ?,?)`;

      const excute = await this.db.query(query, [
        binhluan.MaKhoaHoc,
        binhluan.MaNguoiDung,
        binhluan.NoiDung,
        binhluan.ThoiGian,
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
      const comment = req.body;

      const del = `DELETE FROM binhluan WHERE MaBinhLuan = ?`;
      const exDel = await this.db.query(del, [comment.MaBinhLuan]);

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
      const comment = req.body;

      const query = `UPDATE binhluan SET
                    MaKhoaHoc = ?,
                    MaNguoiDung = ?,
                    NoiDung = ?,
                    ThoiGian = ?
                  WHERE MaBinhLuan   = ?`;

      const excute = await this.db.query(query, [
        comment.MaKhoaHoc,
        comment.MaNguoiDung,
        comment.NoiDung,
        comment.ThoiGian,
        comment.MaBinhLuan,
      ]);

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

module.exports = new CommentController();
