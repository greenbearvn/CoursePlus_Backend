const Database = require("../../config/database");

class KhoaHocController {
  constructor() {
    this.db = Database;
  }

  lists = async (req, res) => {
    try {
      const sql = `SELECT khoahoc.*, capdo.TenCapDo, giangvien.TenGiangVien, chitietdanhmuc.TenCTDM FROM khoahoc inner join capdo on khoahoc.MaCapDo = capdo.MaCapDo inner join giangvien on khoahoc.MaGiangVien = giangvien.MaGiangVien inner join chitietdanhmuc on khoahoc.MaDanhMuc = chitietdanhmuc.MaCTDM `;
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

      const sql = `SELECT khoahoc.* from khoahoc where '${id}'`;
      const data = await this.db.query(sql, []);
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

  getListLevels = async (req, res) => {
    try {
      const sql = `SELECT * from capdo `;
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

  getListTeachers = async (req, res) => {
    try {
      const sql = `SELECT * from giangvien `;
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

  getListDetailCategory = async (req, res) => {
    try {
      const sql = `SELECT * from chitietdanhmuc `;
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
      const khoahoc = req.body;

      console.log(khoahoc);

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
        khoahoc.GiamGia,
        lastPrice,
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

  delete = async (req, res) => {
    try {
      const khoahoc = req.body;
      console.log(khoahoc.id);

      const del = `DELETE FROM khoahoc WHERE id = '${khoahoc.id}'`;
      const exDel = await this.db.query(del, []);

      const sql = `SELECT khoahoc.*, capdo.TenCapDo, giangvien.TenGiangVien, chitietdanhmuc.TenCTDM FROM khoahoc inner join capdo on khoahoc.MaCapDo = capdo.MaCapDo inner join giangvien on khoahoc.MaGiangVien = giangvien.MaGiangVien inner join chitietdanhmuc on khoahoc.MaDanhMuc = chitietdanhmuc.MaCTDM`;
      const data = await this.db.query(sql, []);

      if (data) {
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

  update = async (req, res) => {
    try {
      const khoahoc = req.body;

      const lastPrice = khoahoc.GiaCu - (khoahoc.GiaCu * khoahoc.GiamGia) / 100;

      const query = `UPDATE khoahoc SET
                      TenKhoaHoc = ?,
                      AnhKhoaHoc = ?,
                      MoTaNgan = ?,
                      MoTaDayDu = ?,
                      ThoiGian = ?,
                      ThoiLuongKhoaHoc = ?,
                      GiaCu = ?,
                      GiamGia = ?,
                      GiaMoi = ?,
                      TrangThai = ?,
                      MaCapDo = ?,
                      MaGiangVien = ?,
                      MaDanhMuc = ?
                  WHERE id = ?`;

      const excute = await this.db.query(query, [
        khoahoc.TenKhoaHoc,
        khoahoc.AnhKhoaHoc,
        khoahoc.MoTaNgan,
        khoahoc.MoTaDayDu,
        khoahoc.ThoiGian,
        khoahoc.ThoiLuongKhoaHoc,
        khoahoc.GiaCu,
        khoahoc.GiamGia,
        lastPrice,
        khoahoc.TrangThai,
        khoahoc.MaCapDo,
        khoahoc.MaGiangVien,
        khoahoc.MaDanhMuc,
        khoahoc.id,
      ]);

      const sql = `SELECT khoahoc.*, capdo.TenCapDo, giangvien.TenGiangVien, chitietdanhmuc.TenCTDM FROM khoahoc inner join capdo on khoahoc.MaCapDo = capdo.MaCapDo inner join giangvien on khoahoc.MaGiangVien = giangvien.MaGiangVien inner join chitietdanhmuc on khoahoc.MaDanhMuc = chitietdanhmuc.MaCTDM`;
      const data = await this.db.query(sql, []);

      res.status(200).json({
        status: true,
        data: data,
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

module.exports = new KhoaHocController();
