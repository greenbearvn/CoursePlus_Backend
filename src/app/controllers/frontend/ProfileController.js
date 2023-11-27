const Database = require("../../config/database");

class ProfileController {
  constructor() {
    this.db = Database;
  }

  getProfile = async (req, res) => {
    try {
      const { id } = req.params;
      const uscon2 = req.session.user || {};
      const query = `select giangvien.*, nguoidung.* from giangvien inner join nguoidung on giangvien.MaGiangVien = nguoidung.MaNguoiDung where  MaGiangVien = ?;`;

      const execute = await this.db.query(query, [id]);

      if (execute) {
        res.status(200).json({
          status: true,
          data: execute[0],
          user: uscon2,
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

  createConven = async (req, res) => {
    try {
      const uscon1 = req.body;
      const uscon2 = req.session.user || {};

      const getUs1 = `SELECT MaHoiThoai FROM nguoidunghoithoai WHERE MaNguoiDung = ?`;

      const exGetUs1 = await this.db.query(getUs1, [uscon1.MaNguoiDung]);
      

      const getUs2 = `SELECT MaHoiThoai FROM nguoidunghoithoai WHERE MaNguoiDung = ?`;

      const exGetUs2 = await this.db.query(getUs2, [uscon2.MaNguoiDung]);
    

      if (exGetUs2.length > 0 && exGetUs1.length > 0) {
        res.status(200).json({
          status: true,
          data: exGetUs1[0].MaHoiThoai,
        });
      } else {
        const createConven = `INSERT INTO hoithoai(TenHoiThoai) VALUES (?)`;

        const tenhoithoai = "Hoi thoai duoc tao ngay " + new Date().toString();
        const exCreateConv = await this.db.query(createConven, [tenhoithoai]);

        if (exCreateConv.insertId) {
          const createUsConven1 = `INSERT INTO nguoidunghoithoai(MaNguoiDung, MaHoiThoai) VALUES (?, ?)`;
          const exCreateUsConv1 = await this.db.query(createUsConven1, [
            uscon1.MaNguoiDung,
            exCreateConv.insertId,
          ]);

          const createUsConven2 = `INSERT INTO nguoidunghoithoai(MaNguoiDung, MaHoiThoai) VALUES (?, ?)`;
          const exCreateUsConv2 = await this.db.query(createUsConven2, [
            uscon2.MaNguoiDung,
            exCreateConv.insertId,
          ]);

          res.status(200).json({
            status: true,
            data: exCreateConv.insertId,
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
}

module.exports = new ProfileController();
