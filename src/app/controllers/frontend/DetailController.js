const Database = require("../../config/database");

class HomeController {
  constructor() {
    this.db = Database;
  }

  detail = async (req, res) => {
    try {
      const { id } = req.params;

      const sql = `SELECT
      id,
      TenKhoaHoc,
      AnhKhoaHoc,
      MoTaNgan,
      MoTaDayDu,
      ThoiGian,
      ThoiLuongKhoaHoc,
      GiaCu,
      GiamGia,
      GiaMoi,
      capdo.MaCapDo,
      capdo.TenCapDo,
      giangvien.MaGiangVien,
      giangvien.TenGiangVien,
      chitietdanhmuc.MaCTDM,
      chitietdanhmuc.TenCTDM
  FROM
      khoahoc
  INNER JOIN
      capdo ON khoahoc.MaCapDo = capdo.MaCapDo
  INNER JOIN
      giangvien ON khoahoc.MaGiangVien = giangvien.MaGiangVien
  INNER JOIN
      chitietdanhmuc ON khoahoc.MaDanhMuc = chitietdanhmuc.MaCTDM
  WHERE
      id = '${id}'`;
      const results = await this.db.query(sql, []);
      res.status(200).json({
        data: results[0],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    }
  };

  getLession = async (req, res) => {
    try {
      const { id } = req.params;
      const sql = `SELECT * FROM baihoc where MaKhoaHoc = '${id}'`;
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

  getVideo = async (req, res) => {
    try {
      const { id } = req.params;
      const sql = `SELECT video.* from video INNER join baihoc on video.MaBaiHoc = baihoc.MaBaiHoc INNER join khoahoc on baihoc.MaKhoaHoc = khoahoc.id WHERE id = '${id}'`;
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
}

module.exports = new HomeController();
