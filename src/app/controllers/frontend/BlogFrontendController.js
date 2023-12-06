const Database = require("../../config/database");

class BlogFrontendController {
  constructor() {
    this.db = Database;
  }

  list = async (req, res) => {
    try {
      const filter = req.body;

      if (filter.records && filter.findWith === "dm") {
        const sql = `SELECT 	blog.*,danhmuc.*,chitietdanhmuc.*,nguoidung.*
        FROM blog
        INNER JOIN chitietdanhmuc ON blog.MaDanhMuc = chitietdanhmuc.MaCTDM
        INNER JOIN danhmuc ON chitietdanhmuc.madm = danhmuc.madm
        INNER JOIN nguoidung ON blog.MaNguoiDung = nguoidung.MaNguoiDung
        where danhmuc.madm = ? 
        ORDER BY blog.MaBaiViet
        LIMIT ?`;
        const results = await this.db.query(sql, [
          filter.cateId,
          filter.records,
        ]);
        if (results) {
          res.status(200).json({
            ok: true,
            data: results,
          });
        }
      } else if (filter.records && filter.findWith === "ctdm") {
        const sql = `SELECT 	blog.*,danhmuc.*,chitietdanhmuc.*,nguoidung.*
        FROM blog
        INNER JOIN chitietdanhmuc ON blog.MaDanhMuc = chitietdanhmuc.MaCTDM
        INNER JOIN danhmuc ON chitietdanhmuc.madm = danhmuc.madm
        INNER JOIN nguoidung ON blog.MaNguoiDung = nguoidung.MaNguoiDung
        where chitietdanhmuc.MaCTDM  = ? 
        ORDER BY blog.MaBaiViet
        LIMIT ?`;
        const results = await this.db.query(sql, [
          filter.cateId,
          filter.records,
        ]);
        if (results) {
          res.status(200).json({
            ok: true,
            data: results,
          });
        }
      } else {
        const sql = `SELECT 	blog.*,danhmuc.*,chitietdanhmuc.*,nguoidung.*
        FROM blog
        INNER JOIN chitietdanhmuc ON blog.MaDanhMuc = chitietdanhmuc.MaCTDM
        INNER JOIN danhmuc ON chitietdanhmuc.madm = danhmuc.madm
        INNER JOIN nguoidung ON blog.MaNguoiDung = nguoidung.MaNguoiDung
        ORDER BY blog.MaBaiViet
        LIMIT ?`;
        const results = await this.db.query(sql, [filter.records]);
        if (results) {
          res.status(200).json({
            ok: true,
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
}

module.exports = new BlogFrontendController();
