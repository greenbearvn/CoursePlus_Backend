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

      const query = `INSERT INTO hoithoai( TenHoiThoai)
        VALUES ( ?)`;

      const excute = await this.db.query(query, [hoithoai.TenHoiThoai]);

      if (excute.insertId) {
        res.status(200).json({
          status: true,
          data: excute.insertId,
        });
      } else {
        res.status(200).json({
          status: false,
          data: null,
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
      const hoithoai = req.body;

      const delHT = `DELETE FROM hoithoai WHERE MaHoiThoai  = ?`;
      const exDelHT = await this.db.query(delHT, [hoithoai.MaHoiThoai]);

      const delNDHT = `DELETE FROM  nguoidunghoithoai WHERE MaHoiThoai  = ?`;
      const exDelNDHT = await this.db.query(delNDHT, [hoithoai.MaHoiThoai]);

      const delTN = `DELETE FROM  nguoidunghoithoai WHERE MaHoiThoai  = ?`;
      const exDelTN = await this.db.query(delTN, [hoithoai.MaHoiThoai]);

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
                  WHERE MaHoiThoai   = ?`;

      const excute = await this.db.query(query, [
        hoithoai.TenHoiThoai,
        hoithoai.MaHoiThoai,
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

  insertUser = async (req, res) => {
    try {
      const listUser = req.body;

      for (let i = 0; i < listCart.length; i++) {
        let cartData = {
          MaDonHang: excute.insertId,
          MaKhoaHoc: listCart[i].id,
          MaGiangVien: listCart[i].MaGiangVien,
          MaCapDo: listCart[i].MaCapDo,
          Gia: listCart[i].GiaMoi,
        };

        const checkAdded = `SELECT MaKhoaHoc FROM chitietdonhang INNER JOIN donhang ON chitietdonhang.MaDonHang = donhang.MaDonHang WHERE MaNguoiDung = ? AND MaKhoaHoc = ?`;
        const exCheckAdded = await this.db.query(checkAdded, [
          MaNguoiDung,
          cartData.MaKhoaHoc,
        ]);

        if (exCheckAdded.length > 0) {
          return res.status(200).json({
            data: false,
          });
        } else {
          const qrInsertCTDH = `INSERT INTO chitietdonhang (MaDonHang, MaKhoaHoc, MaGiangVien, MaCapDo, Gia)
            VALUES (?, ?, ?, ?, ?)`;

          const excuteInsertCTDH = await this.db.query(qrInsertCTDH, [
            cartData.MaDonHang,
            cartData.MaKhoaHoc,
            cartData.MaGiangVien,
            cartData.MaCapDo,
            cartData.Gia,
          ]);

          return res.status(200).json({
            data: true,
          });
        }
      }

      const query = `INSERT INTO nguoidunghoithoai( MaNguoiDung ,MaHoiThoai )
        VALUES ( ?,?)`;

      const excute = await this.db.query(query, [
        userconvent.TenHoiThoai,
        userconvent.MaHoiThoai,
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
