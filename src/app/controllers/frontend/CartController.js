const Database = require("../../config/database");

class CartController {
  constructor() {
    this.db = Database;
  }

  showCart = async (req, res) => {
    try {
      let listCart = req.session.cart;
      if (!listCart) {
        listCart = [];
      }

      res.status(200).json({
        data: listCart,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    }
  };

  addCart = async (req, res) => {
    try {
      const {
        id,
        TenKhoaHoc,
        MaHoSo,
        GiaMoi,
        MaCapDo,
        ThoiLuongKhoaHoc,
        TenCapDo,
        TenHoSo,
        TenCTDM,
        GiaCu,
        AnhKhoaHoc,
      } = req.body.cart;

      if (!req.session.cart) {
        req.session.cart = [];
      }

      const listCart = req.session.cart;

      let count = 0;
      for (let i = 0; i < listCart.length; i++) {
        if (listCart[i].id === id) {
          res.status(200).json({
            data: false,
          });
          count++;
          break;
        }
      }

      if (count === 0) {
        const cartData = {
          id: id,
          TenKhoaHoc: TenKhoaHoc,
          MaHoSo: MaHoSo,
          GiaMoi: GiaMoi,
          MaCapDo: MaCapDo,
          ThoiLuongKhoaHoc: ThoiLuongKhoaHoc,
          TenCapDo: TenCapDo,
          TenHoSo: TenHoSo,
          TenCTDM: TenCTDM,
          GiaCu: GiaCu,
          AnhKhoaHoc: AnhKhoaHoc,
        };
        req.session.cart.push(cartData);
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

  deleteItem = async (req, res) => {
    try {
      const { id } = req.body;

      let listCart = req.session.cart;
      if (!listCart) {
        listCart = [];
      }

      let foundIndex = -1;
      for (let i = 0; i < listCart.length; i++) {
        if (listCart[i].id === id) {
          foundIndex = i;
          break;
        }
      }

      if (foundIndex !== -1) {
        listCart.splice(foundIndex, 1);
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

  totalMoney = async (req, res) => {
    try {
      let total = 0;
      let count = 0;
      let listCart = req.session.cart;
      if (!listCart) {
        listCart = [];
      }

      for (let i = 0; i < listCart.length; i++) {
        total += listCart[i].GiaMoi;
        count += 1;
      }

      res.status(200).json({
        data: total,
        count: count,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    }
  };

  checkCourseBought = async (req, res) => {
    try {
      const user = req.session.user || {};
      const manguoidung = user.MaNguoiDung;

      let listCart = req.session.cart;
      if (!listCart) {
        listCart = [];
      }
      // kiểm tra xem đã mua khóa học ở trong bộ sưu tập của mình hay chưa
      let hasDuplicateCourse = false;
      for (let i = 0; i < listCart.length; i++) {
        const getMaBST =
          "SELECT * FROM bosuutap inner join chitietbst on  bosuutap.MaBST = chitietbst.MaBST WHERE MaNguoiDung = ? AND MaKhoaHoc = ?";

        const exGetMaBST = await this.db.query(getMaBST, [
          manguoidung,
          listCart[i].id,
        ]);

        if (exGetMaBST.length > 0) {
          if (exGetMaBST[0].MaBST > 0) {
            hasDuplicateCourse = true;
            break;
          }
        }
      }

      if (hasDuplicateCourse == true) {
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

module.exports = new CartController();
