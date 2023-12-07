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

module.exports = new CategoryController();
