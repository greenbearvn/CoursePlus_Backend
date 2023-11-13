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
        MaGiangVien,
        GiaMoi,
        MaCapDo,
        ThoiLuongKhoaHoc,
        TenCapDo,
        TenGiangVien,
        TenCTDM,
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
          MaGiangVien: MaGiangVien,
          GiaMoi: GiaMoi,
          MaCapDo: MaCapDo,
          ThoiLuongKhoaHoc: ThoiLuongKhoaHoc,
          TenCapDo: TenCapDo,
          TenGiangVien: TenGiangVien,
          TenCTDM: TenCTDM
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

  totalMoney = async (req, res) => {
    try {
      let total = 0;
      let listCart = req.session.cart;
      if (!listCart) {
        listCart = [];
      }

      for (let i = 0; i < listCart.length; i++) {
        total += listCart[i].GiaMoi;
      }

      res.status(200).json({
        data: total,
      });
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
