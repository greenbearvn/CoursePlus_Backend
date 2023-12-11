const Database = require("../../config/database");

class HoaDonController {
  constructor() {
    this.db = Database;
  }

  lists = async (req, res) => {
    try {
      const sql = `select donhang.*, nguoidung.* from donhang inner join nguoidung on donhang.MaNguoiDung = nguoidung.MaNguoiDung`;
      const data = await this.db.query(sql, []);
      if (data) {
        res.status(200).json({
          data: data,
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
      const sql = `SELECT donhang.* from donhang where MaDonHang = '${id}'`;
      const data = await this.db.query(sql, []);
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

  getListUser = async (req, res) => {
    try {
      const sql = `SELECT * from nguoidung `;
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

  create = async (req, res) => {
    try {
      const { MaNguoiDung, NgayLap, Tongtien } = req.query;
      const listCart = req.body;

      const query = `INSERT INTO donhang (MaNguoiDung, NgayLap, Tongtien)
        VALUES (?, ?, ?)`;

      const excute = await this.db.query(query, [
        MaNguoiDung,
        NgayLap,
        Tongtien,
      ]);

      if (excute.insertId) {
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
      } else {
        return res.status(200).json({
          data: false,
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    }
  };

  delete = async (req, res) => {
    try {
      const donhang = req.body;

      const del = `DELETE FROM donhang WHERE MaDonHang = '${donhang.MaDonHang}'`;
      const exDel = await this.db.query(del, []);
      if (exDel.affectedRows > 0) {
        const sql = `select donhang.*, nguoidung.* from donhang inner join nguoidung on donhang.MaNguoiDung = nguoidung.MaNguoiDung`;
        const data = await this.db.query(sql, []);

        if (data) {
          res.status(200).json({
            status: true,
            data: data,
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

  getListDetailBill = async (req, res) => {
    try {
      const { id } = req.params;
      const sql = `SELECT * from chitietdonhang inner join khoahoc on chitietdonhang.MaKhoaHoc = khoahoc.id inner join giangvien on chitietdonhang.MaGiangVien = giangvien.MaHoSo inner join capdo on chitietdonhang.MaCapDo = capdo.MaCapDo where MaDonHang = ?`;
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

  deleteDetailItem = async (req, res) => {
    try {
      const donhang = req.body;
      const delQr = `delete from chitietdonhang where MaDonHang = ? and MaKhoaHoc = ?`;
      const exDelQr = await this.db.query(delQr, [
        donhang.MaDonHang,
        donhang.MaKhoaHoc,
      ]);

      const sql = `SELECT * from chitietdonhang inner join khoahoc on chitietdonhang.MaKhoaHoc = khoahoc.id inner join giangvien on chitietdonhang.MaGiangVien = giangvien.MaHoSo inner join capdo on chitietdonhang.MaCapDo = capdo.MaCapDo where MaDonHang = ?`;
      const results = await this.db.query(sql, [donhang.MaDonHang]);
      if (exDelQr.affectedRows > 0) {
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

  update = async (req, res) => {
    try {
      const { MaDonHang, MaNguoiDung, NgayLap, Tongtien } = req.query;
      const listCart = req.body;

      console.log(listCart);

      const query = `UPDATE donhang SET
                      MaNguoiDung = ?,
                      NgayLap = ?,
                      Tongtien = ?
                  WHERE MaDonHang = ?`;

      const execute = await this.db.query(query, [
        MaNguoiDung,
        NgayLap,
        Tongtien,
        MaDonHang,
      ]);

      if (execute.affectedRows > 0) {
        for (let i = 0; i < listCart.length; i++) {
          let cartData = {
            MaDonHang: MaDonHang,
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
              data: "Khóa học đã được mua trước đó không được mua nữa",
            });
          } else {
            const checkExist = `SELECT MaDonHang FROM chitietdonhang WHERE MaDonHang = ? AND MaKhoaHoc = ?`;
            const exCheckExist = await this.db.query(checkExist, [
              MaDonHang,
              cartData.MaKhoaHoc,
            ]);

            if (exCheckExist.length > 0) {
              return res.status(200).json({
                data: "Khóa học đã tồn tại trong đơn hàng",
              });
            } else {
              const qrInsertCTDH = `INSERT INTO chitietdonhang (MaDonHang, MaKhoaHoc, MaGiangVien, MaCapDo, Gia)
              VALUES (?, ?, ?, ?, ?)`;

              const executeInsertCTDH = await this.db.query(qrInsertCTDH, [
                cartData.MaDonHang,
                cartData.MaKhoaHoc,
                cartData.MaGiangVien,
                cartData.MaCapDo,
                cartData.Gia,
              ]);

              return res.status(200).json({
                data: "Thêm thành công",
              });
            }
          }
        }
      } else {
        return res.status(200).json({
          data: "Lỗi kết nối với cơ sở dữ liệu",
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

module.exports = new HoaDonController();
