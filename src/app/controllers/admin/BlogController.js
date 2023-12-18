const Database = require("../../config/database");

class BlogController {
  constructor() {
    this.db = Database;
  }

  list = async (req, res) => {
    try {
      const sql = `select * from blog inner join danhmuc on blog.MaDanhMuc = danhmuc.madm inner join nguoidung on blog.MaNguoiDung = nguoidung.MaNguoiDung order by MaBaiViet DESC`;
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

  listUser = async (req, res) => {
    try {
      const sql = `select * from nguoidung`;
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

  listCategory = async (req, res) => {
    try {
      const sql = `select * from danhmuc`;
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

      const sql = `SELECT * from blog where MaBaiViet = ?`;
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

      const query = `INSERT INTO blog (TenBaiViet , NoiDung, AnhMinhHoa,NgayDang,MaDanhMuc,MaNguoiDung,TrangThai )
        VALUES ( ?, ?,?, ?,?, ?,?)`;

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

  delete = async (req, res) => {
    try {
      const blog = req.body;

      const del = `DELETE FROM blog WHERE MaBaiViet = ?`;
      const exDel = await this.db.query(del, [blog.MaBaiViet]);

      if (exDel.affectedRows > 0) {
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

  update = async (req, res) => {
    try {
      const blog = req.body;

      const query = `UPDATE blog SET
                    TenBaiViet = ?,
                    NoiDung = ?,
                    AnhMinhHoa = ?,
                    NgayDang = ?,
                    MaDanhMuc = ?,
                    MaNguoiDung  = ?,
                    TrangThai  = ?
                  WHERE MaBaiViet  = ?`;

      const excute = await this.db.query(query, [
        blog.TenBaiViet,
        blog.NoiDung,
        blog.AnhMinhHoa,
        blog.NgayDang,
        blog.MaDanhMuc,
        blog.MaNguoiDung,
        blog.TrangThai,
        blog.MaBaiViet,
      ]);

      if (excute.affectedRows > 0) {
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
}

module.exports = new BlogController();
