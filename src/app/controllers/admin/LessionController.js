const Database = require("../../config/database");
const bcrypt = require("bcrypt");

class LessionController {
  constructor() {
    this.db = Database;
  }

  list = async (req, res) => {
    try {
      const { makhoahoc } = req.params;
      const sql = `SELECT * FROM baihoc INNER JOIN khoahoc ON baihoc.MaKhoaHoc = khoahoc.id WHERE MaKhoaHoc = ? ORDER BY MaBaiHoc ASC`;
      const results = await this.db.query(sql, [makhoahoc]);

      if (results.length > 0) {
        const getVideo = `SELECT baihoc.*, video.* FROM video inner join baihoc on video.MaBaiHoc = baihoc.MaBaiHoc  WHERE baihoc.MaKhoaHoc = ?`;
        const videos = await this.db.query(getVideo, [makhoahoc]);

        // Add videos to each lesson object
        const lessonsWithVideos = results.map((lesson) => {
          const lessonVideos = videos.filter(
            (video) => video.MaBaiHoc === lesson.MaBaiHoc
          );
          return { ...lesson, videos: lessonVideos };
        });

        res.status(200).json({
          data: lessonsWithVideos,
        });
      } else {
        res.status(404).json({
          message: "No lessons found for the given course.",
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
      const sql = `select * from khoahoc`;
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

      const sql = `SELECT * from baihoc where MaBaiHoc = ?`;
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
      const lession = req.body;

      const query = `INSERT INTO baihoc( MaKhoaHoc, TenBaiHoc,ThoiGianHoanThanh)
        VALUES ( ?, ?,?)`;

      const excute = await this.db.query(query, [
        lession.MaKhoaHoc,
        lession.TenBaiHoc,
        lession.ThoiGianHoanThanh,
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
      const lesion = req.body;

      const del = `DELETE FROM baihoc WHERE MaBaiHoc = ?`;
      const exDel = await this.db.query(del, [lesion.MaBaiHoc]);

      if (exDel.affectedRows > 0) {
        res.status(200).json({
          status: true,
          data: exDel,
        });
      } else {
        res.status(404).json({
          status: false,
          error: "Lession not found!",
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
      const baihoc = req.body;

      const query = `UPDATE baihoc SET
                      MaKhoaHoc = ?,
                      TenBaiHoc = ?,
                      ThoiGianHoanThanh = ?
                  WHERE MaBaiHoc = ?`;

      const excute = await this.db.query(query, [
        baihoc.MaKhoaHoc,
        baihoc.TenBaiHoc,
        baihoc.ThoiGianHoanThanh,
        baihoc.MaBaiHoc,
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

module.exports = new LessionController();
