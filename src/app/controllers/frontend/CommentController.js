const Database = require("../../config/database");

class CommentController {
  constructor() {
    this.db = Database;
  }

  list = async (req, res) => {
    try {
      const { id } = req.params;
      const sql = `select * from binhluan where MaKhoaHoc = ? order by MaBinhLuan desc`;
      const results = await this.db.query(sql, [id]);

      res.status(200).json({
        ok: true,
        data: results,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    }
  };

  checkCmtOfUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = req.session.user || {};
      const sql = `select * from binhluan where MaBinhLuan = ? and MaNguoiDung = ?`;
      const results = await this.db.query(sql, [id, user.MaNguoiDung]);

      if (results.length > 0) {
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
      const binhluan = req.body;
      const sql = `delete from binhluan where MaBinhLuan = ?`;
      const results = await this.db.query(sql, [binhluan.MaBinhLuan]);

      if (results.affectedRows > 0) {
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
}

module.exports = new CommentController();
