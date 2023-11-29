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
      const user = req.session.user || {};
      if (user) {
        const getListUsers = `select * from hoithoai inner join nguoidunghoithoai on hoithoai.MaHoiThoai = nguoidunghoithoai.MaHoiThoai where MaNguoiDung = ?`;
        const exGetListUsers = await this.db.query(getListUsers, [
          user.MaNguoiDung,
        ]);

        if (exGetListUsers) {
          res.status(200).json({
            status: true,
            data: exGetListUsers,
          });
        } else {
          res.status(200).json({
            status: false,
            data: exGetListUsers,
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

  getMessagesInConv = async (req, res) => {
    try {
      const { id } = req.params;

      const messages = `select * from tinnhan where MaHoiThoai  = '${id}'`;

      const exmessages = await this.db.query(messages, []);

      if (exmessages) {
        res.status(200).json({
          status: true,
          data: exmessages,
        });
      } else {
        res.status(200).json({
          status: true,
          data: exmessages,
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

  createMessage = async (req, res) => {
    try {
      const message = req.body;

      const insert = `INSERT INTO tinnhan(MaHoiThoai , MaNguoiDung , NoiDung,ThoiGian)
        VALUES (?,?,?,?)`;
      const exInsert = await this.db.query(insert, [
        message.MaHoiThoai,
        message.MaNguoiDung,
        message.NoiDung,
        message.ThoiGian,
      ]);

      if (exInsert.insertId) {
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

  deleteMessage = async (req, res) => {
    try {
      const { id } = req.params;
      const delMess = `delete from tinnhan where MaTinNhan  = '${id}'`;

      const exDelMess = await this.db.query(delMess, [id]);

      if (result && result.affectedRows > 0) {
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

  deleteConv = async (req, res) => {
    try {
      const { id } = req.params;
      const delConv = `delete from hoithoai where MaHoiThoai  = '${id}'`;

      const exDelConv = await this.db.query(delConv, [id]);

      if (exDelConv && exDelConv.affectedRows > 0) {
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
}

module.exports = new ChatController();
