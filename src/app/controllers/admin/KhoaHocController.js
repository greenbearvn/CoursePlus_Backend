const Database = require("../../config/database");
const khoahoc = require("../../models/khoahoc");

class KhoaHocController {
  constructor() {
    this.db = Database;
  }

  uploadImage = async (req, res) => {
    try {
      const fileName = req.file ? req.file.filename : "";
      res.json({ fileName });
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
      khoahoc = req.body;

      const lastPrice = khoahoc.GiaCu - (khoahoc.GiaCu * khoahoc.GiamGia) / 100;

      const query = `INSERT INTO khoahoc (TenKhoaHoc, AnhKhoaHoc, MoTaNgan,MoTaDayDu,ThoiGian,ThoiLuongKhoaHoc,GiaCu,GiamGia,GiaMoi,TrangThai,MaCapDo,MaGiangVien,MaDanhMuc)
        VALUES (?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?)`;

      const excute = await this.db.query(query, [
        khoahoc.TenKhoaHoc,
        khoahoc.AnhKhoaHoc,
        khoahoc.MoTaNgan,
        khoahoc.MoTaDayDu,
        khoahoc.ThoiGian,
        khoahoc.ThoiLuongKhoaHoc,
        khoahoc.GiaCu,
        lastPrice,
        khoahoc.GiaMoi,
        khoahoc.TrangThai,
        khoahoc.MaCapDo,
        khoahoc.MaGiangVien,
        khoahoc.MaDanhMuc,
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
}

module.exports = new KhoaHocController();
