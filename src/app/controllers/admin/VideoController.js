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
}

module.exports = new VideoController();
