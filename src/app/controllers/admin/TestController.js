const Database = require("../../config/database");

class NguoiDungController {
  constructor() {
    this.db = Database;
  }

  list = async (req, res) => {
    try {
      const sql = `select * from baikiemtra inner join giangvien on baikiemtra.MaGiangVien = giangvien.MaHoSo inner join video on baikiemtra.MaVideo = video.MaVideo order by MaBaiKT DESC`;
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

      const sql = `SELECT * from baikiemtra inner join giangvien on baikiemtra.MaGiangVien = giangvien.MaHoSo inner join video on baikiemtra.MaVideo = video.MaVideo where MaBaiKT = ?`;
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
      const test = req.body;
      console.log(test);

      // const query = `INSERT INTO baikiemtra ( TenBaiKT, MoTaBaiKT,MaGiangVien,MaVideo)
      //   VALUES ( ?, ?,?, ?)`;

      // const excute = await this.db.query(query, [
      //   test.TenBaiKT,
      //   test.MoTaBaiKT,
      //   test.MaGiangVien,
      //   test.MaVideo,
      // ]);

      // if (excute.insertId) {
      //   res.status(200).json({
      //     data: true,
      //   });
      // } else {
      //   res.status(200).json({
      //     data: false,
      //   });
      // }
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
      const test = req.body;

      const del = `DELETE FROM baikiemtra WHERE MaBaiKT = ?`;
      const exDel = await this.db.query(del, [test.MaBaiKT]);

      if (exDel.affectedRows > 0) {
        res.status(200).json({
          status: true,
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
      const test = req.body;

      const query = `UPDATE baikiemtra SET
                    TenBaiKT = ?,
                    MoTaBaiKT = ?,
                    MaGiangVien  = ?,
                    MaVideo  = ?
                  WHERE MaBaiKT  = ?`;

      const excute = await this.db.query(query, [
        test.TenBaiKT,
        test.MoTaBaiKT,
        test.MaGiangVien,
        test.MaVideo,
        test.MaBaiKT,
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
