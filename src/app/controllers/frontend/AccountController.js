const Database = require("../../config/database");
const nguoidung = require("../../models/nguoidung");

const bcrypt = require("bcrypt");

class AccountController {
  constructor() {
    this.db = Database;
  }

  register = async (req, res) => {
    try {
      const nguoidung = req.body;
      const account = nguoidung.user;

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);

      const hashPass = await bcrypt.hash(account.MatKhau, salt);

      account.MatKhau = hashPass;
      account.Quyen = 0;

      const query = `INSERT INTO nguoidung (TenNguoiDung, Email, MatKhau, Quyen)
        VALUES (?, ?, ?, ?)`;

      const execute = await this.db.query(query, [
        account.TenNguoiDung,
        account.Email,
        account.MatKhau,
        account.Quyen,
      ]);

      if (execute.insertId) {
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
  login = async (req, res) => {
    try {
      const nguoidung = req.body;
      const account = nguoidung.user;
      const sql = `SELECT * FROM nguoidung where Email = '${account.Email}'`;
      const results = await this.db.query(sql, []);
      const resUser = results[0];
      const user = req.session.user || []; // Initialize as an array if it doesn't exist
  
      console.log(account.MatKhau, resUser.MatKhau);
  
      if (resUser) {
        const isMatch = await bcrypt.compare(account.MatKhau, resUser.MatKhau);
  
        if (user) {
          const userData = {
            MaNguoiDung: resUser.MaNguoiDung,
            TenNguoiDung: resUser.TenNguoiDung,
            Email: resUser.Email,
            Quyen: resUser.Quyen,
          };
  
          user.push(userData);
  
          res.status(200).json({
            data: user,
          });
          
        }
        
      }
      res.status(404).json({
        error: "User not found",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    }
  };

  // login = async (req, res) => {
  //   try {
  //     const nguoidung = req.body;
  //     const account = nguoidung.user;
  //     const sql = `SELECT * FROM nguoidung where Email = '${account.Email}'`;
  //     const results = await this.db.query(sql, []);
  //     const resUser = results[0];
  //     const user = req.session.user;

  //     console.log(account.MatKhau, resUser.MatKhau);

  //     if (resUser) {
  //       const isMatch = await bcrypt.compare(account.MatKhau, resUser.MatKhau);

  //       if (!user) {
  //         const userData = {
  //           MaNguoiDung: resUser.MaNguoiDung,
  //           TenNguoiDung: resUser.TenNguoiDung,
  //           Email: resUser.Email,
  //           Quyen: resUser.Quyen,
  //         };

  //         req.session.user.push(userData);

  //         res.status(200).json({
  //           data: user,
  //         });
  //         return; // Thêm lệnh return để kết thúc hàm sau khi gửi phản hồi thành công
  //       }
  //       // if (isMatch) {
  //       //   if (!user) {
  //       //     userData = {
  //       //       MaNguoiDung: resUser.MaNguoiDung,
  //       //       TenNguoiDung: resUser.TenNguoiDung,
  //       //       Email: resUser.Email,
  //       //       Quyen: resUser.Quyen,
  //       //     };
  //       //     user.push(userData);

  //       //     res.status(200).json({
  //       //       data: user,
  //       //     });
  //       //     return; // Thêm lệnh return để kết thúc hàm sau khi gửi phản hồi thành công
  //       //   }
  //       // }
  //     }
  //     res.status(404).json({
  //       error: "User not found",
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({
  //       ok: false,
  //       error: "Something went wrong!",
  //     });
  //   }
  // };
}

module.exports = new AccountController();
