const Database = require("../../config/database");

class CategoryController {
  constructor() {
    this.db = Database;
  }

  list = async (req, res) => {
    try {
      const sql = `select * from hoithoai order by MaHoiThoai DESC `;
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

      const sql = `SELECT * from hoithoai where MaHoiThoai = ?`;
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
      const hoithoai = req.body;

      const query1 = `INSERT INTO hoithoai(TenHoiThoai) VALUES (?)`;
      const result1 = await this.db.query(query1, [hoithoai.TenHoiThoai]);

      if (result1.insertId > 0) {
        for (let item of hoithoai.userconventions) {
          const query2 = `INSERT INTO nguoidunghoithoai(MaNguoiDung, MaHoiThoai) VALUES (?, ?)`;
          await this.db.query(query2, [item.MaNguoiDung, result1.insertId]);
        }
      }

      res.status(200).json({
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

  delete = async (req, res) => {
    try {
      const hoithoai = req.body;
      const delMes = `DELETE FROM  tinnhan WHERE MaNguoiDung   = ?`;
      this.db.query(delMes, [hoithoai.MaNguoiDung]);
      

      const delNDHT = `DELETE FROM  nguoidunghoithoai  WHERE MaHoiThoai  = ?`;
      await this.db.query(delNDHT, [hoithoai.MaHoiThoai]);

      const delHT = `DELETE FROM hoithoai WHERE MaHoiThoai  = ?`;
      const exDelHT = await this.db.query(delHT, [hoithoai.MaHoiThoai]);

      res.status(200).json({
        status: true,
      });
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
      const hoithoai = req.body;

      const query = `UPDATE hoithoai SET
                    TenHoiThoai = ?
                  WHERE MaHoiThoai = ?`;

      await this.db.query(query, [hoithoai.TenHoiThoai, hoithoai.MaHoiThoai]);

      for (let item of hoithoai.userconventions) {
        const getUS = `SELECT * FROM nguoidunghoithoai WHERE MaNguoiDung = ? AND MaHoiThoai = ?`;
        const exgetUS = await this.db.query(getUS, [
          item.MaNguoiDung,
          hoithoai.MaHoiThoai,
        ]);

        if (exgetUS.length <= 0) {
          const query2 = `INSERT INTO nguoidunghoithoai(MaNguoiDung, MaHoiThoai) VALUES (?, ?)`;
          await this.db.query(query2, [item.MaNguoiDung, hoithoai.MaHoiThoai]);
        }
      }

      res.status(200).json({
        status: true,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    }
  };

  insertMessages = async (req, res) => {
    try {
      const messages = req.body;

      messages.ThoiGian = new Date();

      const query = `INSERT INTO tinnhan(MaHoiThoai,MaNguoiDung ,NoiDung,ThoiGian )
        VALUES ( ?,?,?,?)`;

      const excute = await this.db.query(query, [
        messages.MaHoiThoai,
        messages.MaNguoiDung,
        messages.NoiDung,
        messages.ThoiGian,
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

  getListUser = async (req, res) => {
    try {
      const sql = `select * from nguoidung `;
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

  getListUserConvention = async (req, res) => {
    try {
      const { id } = req.params;
      const sql = `select * from nguoidunghoithoai inner join nguoidung on nguoidunghoithoai.MaNguoiDung = nguoidung.MaNguoiDung   where MaHoiThoai = ?`;
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
}

module.exports = new CategoryController();
