const Database = require("../../config/database");

class ChatController {
  constructor() {
    this.db = Database;
  }

  getUser = async (req, res) => {
    try {
      const user = req.session.user || {};
      if (user) {
        res.status(200).json({
          status: true,
          user: user,
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

  getUserConventions = async (req, res) => {
    try {
      const user = 1;
      if (user) {
        const getListUsers = `select * from hoithoai inner join nguoidunghoithoai on hoithoai.MaHoiThoai = nguoidunghoithoai.MaHoiThoai where MaNguoiDung = ?`;
        const exGetListUsers = await this.db.query(getListUsers, [user]);

        if (exGetListUsers) {
          res.status(200).json({
            status: true,
            data: exGetListUsers,
          });
        }
        else{
          res.status(200).json({
            status: false,
            data: exGetListUsers,
          });
        }

        // const getImageUser = `select * from nguoidung inner join nguoidunghoithoai on nguoidung.MaNguoiDung = nguoidunghoithoai.MaNguoiDung where MaHoiThoai = ?`
        // const exGetImageUser = await this.db.query(sql, [user.MaNguoiDung]);
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

module.exports = new ChatController();
