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

  getListQuestions = async (req, res) => {
    try {
      const { id } = req.params;
      const sql = `select baikiemtra.* from baikiemtra inner join video on 
      baikiemtra.MaVideo = video.MaVideo inner join baihoc on 
      video.MaBaiHoc = baihoc.MaBaiHoc inner join khoahoc on 
      baihoc.MaKhoaHoc = khoahoc.id 
      where khoahoc.id = ?`;
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

  getTeachersOfCour = async (req, res) => {
    try {
      const { id } = req.params;

      const getId = `select * from khoahoc where id = ?`;
      const exGetId = await this.db.query(getId, [id]);

      const teacherId = exGetId[0].MaGiangVien;

      const getInfor = `select *, danhmuc.tendm from giangvien inner join danhmuc on giangvien.MaDanhMuc = danhmuc.madm where MaHoSo = ?`;

      const ExGetInfor = await this.db.query(getInfor, [teacherId]);

      if (ExGetInfor) {
        res.status(200).json({
          data: ExGetInfor[0],
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

  getAllComments = async (req, res) => {
    try {
      const { id } = req.params;

      const getId = `select * from binhluan where MaKhoaHoc = ?`;
      const exGetId = await this.db.query(getId, [id]);
      if (exGetId) {
        res.status(200).json({
          data: exGetId,
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

  getRelateCourses = async (req, res) => {
    try {
      const { id } = req.params;

      const getId = `select * from khoahoc where id = ?`;
      const exGetId = await this.db.query(getId, [id]);

      const teacherId = exGetId[0].MaGiangVien;

      const getRelate = `select * from khoahoc where MaGiangVien = ?`;
      const exGetRelate = await this.db.query(getRelate, [teacherId]);

      if (exGetRelate) {
        res.status(200).json({
          data: exGetRelate,
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
