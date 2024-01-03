const Database = require("../../config/database");

class CategoryController {
  constructor() {
    this.db = Database;
  }

  getListCate = async (req, res) => {
    try {
      const getCate = `SELECT * FROM danhmuc`;
      const exGetCate = await this.db.query(getCate, []);

      const getDetailCate = `SELECT * FROM chitietdanhmuc`;
      const exGetDetailCate = await this.db.query(getDetailCate, []);

      if (exGetCate && exGetDetailCate) {
        res.status(200).json({
          cates: exGetCate,
          detailCates: exGetDetailCate,
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

  getLitCourses = async (req, res) => {
    try {
      const filter = req.body;

      if (filter.id > 0 && filter.type == "ctdm") {
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
      giangvien.MaHoSo,
      giangvien.TenHoSo,
      chitietdanhmuc.MaCTDM,
      chitietdanhmuc.TenCTDM
  FROM
      khoahoc
  INNER JOIN
      capdo ON khoahoc.MaCapDo = capdo.MaCapDo
  INNER JOIN
      giangvien ON khoahoc.MaGiangVien = giangvien.MaHoSo
  INNER JOIN
      chitietdanhmuc ON khoahoc.MaDanhMuc = chitietdanhmuc.MaCTDM
  WHERE
     chitietdanhmuc.MaCTDM = ?
     order by id desc`;
        const results = await this.db.query(sql, [filter.id]);
        if (results.length > 0) {
          res.status(200).json({
            data: results,
          });
        }
      } else if (filter.id > 0 && filter.type == "dm") {
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
      giangvien.MaHoSo,
      giangvien.TenHoSo,
      chitietdanhmuc.MaCTDM,
      chitietdanhmuc.TenCTDM
  FROM
      khoahoc
  INNER JOIN
      capdo ON khoahoc.MaCapDo = capdo.MaCapDo
  INNER JOIN
      giangvien ON khoahoc.MaGiangVien = giangvien.MaHoSo
  INNER JOIN
      chitietdanhmuc ON khoahoc.MaDanhMuc = chitietdanhmuc.MaCTDM
  inner join danhmuc on chitietdanhmuc.madm = danhmuc.madm
  WHERE
     danhmuc.madm = ?
     order by id desc`;
        const results = await this.db.query(sql, [filter.id]);
        if (results.length > 0) {
          res.status(200).json({
            data: results,
          });
        }
      } else {
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
        giangvien.MaHoSo,
        giangvien.TenHoSo,
        chitietdanhmuc.MaCTDM,
        chitietdanhmuc.TenCTDM
    FROM
        khoahoc
    INNER JOIN
        capdo ON khoahoc.MaCapDo = capdo.MaCapDo
    INNER JOIN
        giangvien ON khoahoc.MaGiangVien = giangvien.MaHoSo
    INNER JOIN
        chitietdanhmuc ON khoahoc.MaDanhMuc = chitietdanhmuc.MaCTDM
       order by id desc`;
        const results = await this.db.query(sql, [filter.id]);
        if (results.length > 0) {
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
}

module.exports = new CategoryController();
