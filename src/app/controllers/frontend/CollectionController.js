const Database = require("../../config/database");
const generateToken = require("../../config/jwt/generateToken");
const bcrypt = require("bcrypt");

class AccountController {
  constructor() {
    this.db = Database;
  }

  getListCollections = async (req, res) => {
    try {
      const filter = req.body;

      if (filter.userID > 0 ) {
        const getBST = `SELECT MaBST FROM bosuutap WHERE MaNguoiDung = ?`;
        const exGetBST = await this.db.query(getBST, [filter.userID]);

        if (exGetBST[0]) {
          if (filter.findWith == "ctdm") {
            const getDetailColls = `SELECT chitietbst.*,khoahoc.*,giangvien.*  FROM chitietbst
            inner join khoahoc on chitietbst.MaKhoaHoc = khoahoc.id 
            inner join giangvien on khoahoc.MaGiangVien = giangvien.MaHoSo 
            inner join chitietdanhmuc on khoahoc.MaDanhMuc = chitietdanhmuc.MaCTDM 
            INNER join danhmuc on chitietdanhmuc.madm = danhmuc.madm
              WHERE MaBST = ? and chitietdanhmuc.MaCTDM = ?
            ORDER BY NgayThem DESC`;
            const exGetDetailColls = await this.db.query(getDetailColls, [
              exGetBST[0].MaBST,
              filter.cateId,
            ]);

            res.status(200).json({
              data: exGetDetailColls,
            });
          } else if (filter.findWith == "dm") {
            const getDetailColls = `SELECT chitietbst.*,khoahoc.*,giangvien.*  FROM chitietbst
            inner join khoahoc on chitietbst.MaKhoaHoc = khoahoc.id 
            inner join giangvien on khoahoc.MaGiangVien = giangvien.MaHoSo 
            inner join chitietdanhmuc on khoahoc.MaDanhMuc = chitietdanhmuc.MaCTDM 
            INNER join danhmuc on chitietdanhmuc.madm = danhmuc.madm
              WHERE MaBST = ? and danhmuc.madm = ?
            ORDER BY NgayThem DESC`;
            const exGetDetailColls = await this.db.query(getDetailColls, [
              exGetBST[0].MaBST,
              filter.cateId,
            ]);

            res.status(200).json({
              data: exGetDetailColls,
            });
          } else {
            const getDetailColls = `SELECT chitietbst.*,khoahoc.*,giangvien.*  FROM chitietbst
            inner join khoahoc on chitietbst.MaKhoaHoc = khoahoc.id 
            inner join giangvien on khoahoc.MaGiangVien = giangvien.MaHoSo 
              WHERE MaBST = ? 
            ORDER BY NgayThem DESC`;
            const exGetDetailColls = await this.db.query(getDetailColls, [
              exGetBST[0].MaBST,
            ]);

            res.status(200).json({
              data: exGetDetailColls,
            });
          }
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

module.exports = new AccountController();
