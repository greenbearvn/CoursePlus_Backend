const Database = require("../../config/database");

class TestedController {
  constructor() {
    this.db = Database;
  }

  list = async (req, res) => {
    try {
      const { id } = req.params;
      if (id > 0) {
        const sql = `select bailam.*,baikiemtra.*,nguoidung.* from bailam
         inner join nguoidung on bailam.MaNguoiDung = nguoidung.MaNguoiDung
         inner join baikiemtra on bailam.MaBaiKT  = baikiemtra.MaBaiKT
         inner join video on baikiemtra.MaVideo = video.MaVideo 
         inner join baihoc on video.MaBaiHoc = baihoc.MaBaiHoc
         inner join khoahoc on baihoc.MaKhoaHoc = khoahoc.id
         where khoahoc.MaGiangVien = ?
         order by MaBaiLam DESC
         `;
        const results = await this.db.query(sql, [id]);
        if (results) {
          res.status(200).json({
            data: results,
          });
        }
      } else {
        const sql = `select bailam.*,baikiemtra.*,nguoidung.* from bailam
         inner join nguoidung on bailam.MaNguoiDung = nguoidung.MaNguoiDung
         inner join baikiemtra on bailam.MaBaiKT  = baikiemtra.MaBaiKT
         order by MaBaiLam DESC
         `;
        const results = await this.db.query(sql, []);
        if (results) {
          res.status(200).json({
            data: results,
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

  listUser = async (req, res) => {
    try {
      const { id } = req.params;
      if (id > 0) {
        const sql = `SELECT * from nguoidung inner join donhang on nguoidung.MaNguoiDung = donhang.MaNguoiDung
        inner join chitietdonhang on donhang.MaDonHang = chitietdonhang.MaDonHang
        INNER join khoahoc on chitietdonhang.MaKhoaHoc = khoahoc.id WHERE khoahoc.MaGiangVien = ?`;
        const results = await this.db.query(sql, [id]);
        if (results) {
          res.status(200).json({
            data: results,
          });
        }
      } else {
        const sql = `select * from nguoidung`;
        const results = await this.db.query(sql, []);
        if (results) {
          res.status(200).json({
            data: results,
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

  listTests = async (req, res) => {
    try {
      const { id } = req.params;
      if (id > 0) {
        const sql = `select * from baikiemtra where MaGiangVien = ?`;
        const results = await this.db.query(sql, [id]);
        if (results) {
          res.status(200).json({
            data: results,
          });
        }
      } else {
        const sql = `select * from baikiemtra order by MaBaiKT desc`;
        const results = await this.db.query(sql, []);
        if (results) {
          res.status(200).json({
            data: results,
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

  detail = async (req, res) => {
    try {
      const { id } = req.params;

      const sql = `SELECT * from bailam where MaBaiLam = ?`;
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
      const tested = req.body;

      const query = `INSERT INTO bailam (MaNguoiDung  , MaBaiKT , ThoiGianNop,ChinhXac )
        VALUES ( ?, ?,?,?)`;

      const excute = await this.db.query(query, [
        tested.MaNguoiDung,
        tested.MaBaiKT,
        tested.ThoiGianNop,
        tested.ChinhXac,
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
      const tested = req.body;

      const del = `DELETE FROM blog WHERE MaBaiLam  = ?`;
      const exDel = await this.db.query(del, [tested.MaBaiLam]);

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
      const blog = req.body;

      const query = `UPDATE bailam SET
                    MaNguoiDung  = ?,
                    MaBaiKT   = ?,
                    ThoiGianNop = ?,
                    ChinhXac = ?
                  WHERE MaBaiLam   = ?`;

      const excute = await this.db.query(query, [
        blog.MaNguoiDung,
        blog.MaBaiKT,
        blog.ThoiGianNop,
        blog.ChinhXac,
        blog.MaBaiLam,
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

module.exports = new TestedController();
