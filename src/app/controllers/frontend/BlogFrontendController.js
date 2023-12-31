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
      const blog = req.body;
      blog.NgayDang = new Date();
      const query = `INSERT INTO blog (TenBaiViet, NoiDung, AnhMinhHoa,NgayDang,MaDanhMuc,MaNguoiDung,TrangThai)
        VALUES (?, ?, ?,?, ?, ?,?)`;

      const excute = await this.db.query(query, [
        blog.TenBaiViet,
        blog.NoiDung,
        blog.AnhMinhHoa,
        blog.NgayDang,
        blog.MaDanhMuc,
        blog.MaNguoiDung,
        blog.TrangThai,
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

  detail = async (req, res) => {
    try {
      const { id } = req.params;
      const query = `SELECT * FROM blog where MaBaiViet = ?`;
      const excute = await this.db.query(query, [id]);

      if (excute) {
        res.status(200).json({
          data: excute[0],
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
