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

  

  
}

module.exports = new CategoryController();
