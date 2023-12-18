const Database = require("../../config/database");
const bcrypt = require("bcrypt");

class VideoController {
  constructor() {
    this.db = Database;
  }

  list = async (req, res) => {
    try {
      const { makhoahoc } = req.params;
      const sql = `select * from video inner join baihoc on video.MaBaiHoc = baihoc.MaBaiHoc where MaKhoaHoc = ? `;
      const results = await this.db.query(sql, [makhoahoc]);
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

  listLession = async (req, res) => {
    try {
      const { makhoahoc } = req.params;
      const sql = `select * baihoc`;
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

      const sql = `SELECT * from video where MaVideo = ?`;
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
      const video = req.body;

      const query = `INSERT INTO video( MaBaiHoc, LinkVideo,ThoiLuongVideo,TenVideo,NoiDungVideo)
        VALUES ( ?, ?,?,?, ?)`;

      const excute = await this.db.query(query, [
        video.MaBaiHoc,
        video.LinkVideo,
        video.ThoiLuongVideo,
        video.TenVideo,
        video.NoiDungVideo,
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
      const video = req.body;

      const del = `DELETE FROM video WHERE MaVideo = ?`;
      const exDel = await this.db.query(del, [video.MaVideo]);

      if (exDel.affectedRows > 0) {
        res.status(200).json({
          status: true,
          data: exDel,
        });
      } else {
        res.status(404).json({
          status: false,
          error: "Video not found!",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: false,
        error: "Something went wrong!",
      });
    }
  };

  update = async (req, res) => {
    try {
      const video = req.body;

      const query = `UPDATE video SET
                    MaBaiHoc = ?,
                    LinkVideo = ?,
                    ThoiLuongVideo = ?,
                    TenVideo = ?,
                    NoiDungVideo = ?
                  WHERE MaVideo  = ?`;

      const excute = await this.db.query(query, [
        video.MaBaiHoc,
        video.LinkVideo,
        video.ThoiLuongVideo,
        video.TenVideo,
        video.NoiDungVideo,
        video.MaVideo,
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

  

  updateTest = async (req, res) => {
    try {
      const test = req.body;
    
      const updateTestQuery = `
        UPDATE baikiemtra
        SET TenBaiKT = ?, MoTaBaiKT = ?, MaGiangVien = ?, MaVideo = ?
        WHERE MaBaiKT = ?
      `;

      const exUpdateTest = await this.db.query(updateTestQuery, [
        test.TenBaiKT,
        test.MoTaBaiKT,
        test.MaGiangVien,
        test.MaVideo,
        test.MaBaiKT,
      ]);

      for (let i = 0; i < test.Questions.length; i++) {
        const q = test.Questions[i];

        const getQuestionQuery = `
          SELECT * FROM cauhoi
          WHERE MaCauhoi = ? AND MaBaiKT = ?
        `;
        const exGetQuestion = await this.db.query(getQuestionQuery, [
          q.MaCauHoi,
          test.MaBaiKT
        ]);
      

        if (exGetQuestion.length <= 0) {
          const insertQuestionQuery = `
            INSERT INTO cauhoi(MaBaiKT, MoTaCauHoi, GoiY)
            VALUES (?, ?, ?)
          `;
          const exInsertQuestion = await this.db.query(insertQuestionQuery, [
            test.MaBaiKT,
            q.MoTaCauHoi,
            q.GoiY,
          ]);

          for (let j = 0; j < q.Choices.length; j++) {
            const c = q.Choices[j];

            const getChoicesQuery = `
              SELECT * FROM luachon
              WHERE MaCauHoi = ? AND MaLuaChon = ?
            `;
            const exGetChoices = await this.db.query(getChoicesQuery, [
              exInsertQuestion.insertId,
              c.MaLuaChon,
            ]);

            if (exGetChoices.length <= 0) {
              const insertChoiceQuery = `
                INSERT INTO luachon (MaCauHoi, NoiDung, Dung)
                VALUES (?, ?, ?)
              `;
              const exInsertChoice = await this.db.query(insertChoiceQuery, [
                exInsertQuestion.insertId,
                c.NoiDung,
                c.Dung,
              ]);

              if (!exInsertChoice.insertId) {
                return res.status(500).json({
                  ok: false,
                  error: "Failed to insert choices",
                });
              }
            }
          }
        }
      }

      return res.status(200).json({
        ok: true,
        data: true,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    }
  };

  updateProfile = async (req, res) => {
    try {
      const profile = req.body;

      const query = `UPDATE giangvien SET
                    TenHoSo = ?,
                    Email = ?,
                    SoDienThoai = ?,
                    AnhDaiDien = ?,
                    MoTa = ?,
                    MaDanhMuc  = ?,
                    GiangVien  = ?
                  WHERE MaHoSo  = ?`;

      const excute = await this.db.query(query, [
        profile.TenHoSo,
        profile.Email,
        profile.SoDienThoai,
        profile.AnhDaiDien,
        profile.MoTa,
        profile.MaDanhMuc,
        profile.GiangVien,
        profile.MaHoSo,
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

module.exports = new VideoController();
