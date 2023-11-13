const Database = require("../../config/database");
const moment = require("moment");


class HomeController {
  constructor() {
    this.db = Database;
  }

  saveToDB = async (req, res) => {
    try {
      // const { manguoidung } = req.params;
      const manguoidung = 1;
      const date = new Date();

      let total = 0;
      let listCart = req.session.cart;
      if (!listCart) {
        listCart = [];
      }

      for (let i = 0; i < listCart.length; i++) {
        total += listCart[i].GiaMoi;
      }

      const qrInsertDH = `INSERT INTO donhang (MaNguoiDung, NgayLap, Tongtien)
                        VALUES (?, ?, ?)`;

      const madh = await this.db.query(qrInsertDH, [manguoidung, date, total]);

      for (let i = 0; i < listCart.length; i++) {
        let cartData = {
          MaDonHang: madh.insertId,
          MaKhoaHoc: listCart[i].id,
          MaGiangVien: listCart[i].MaGiangVien,
          MaCapDo: listCart[i].MaCapDo,
          Gia: listCart[i].GiaMoi,
        };

        const qrInsertCTDH = `INSERT INTO chitietdonhang (MaDonHang, MaKhoaHoc, MaGiangVien, MaCapDo, Gia)
                        VALUES (?, ?, ?, ?, ?)`;

        const excute = await this.db.query(qrInsertCTDH, [
          cartData.MaDonHang,
          cartData.MaKhoaHoc,
          cartData.MaGiangVien,
          cartData.MaCapDo,
          cartData.Gia,
        ]);
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
  // const { method } = req.body;

  // if (method === "vnpay") {

  // }

  sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
  }

  transaction = async (req, res) => {
    try {
      let total = 0;
      let listCart = req.session.cart;
      if (!listCart) {
        listCart = [];
      }

      for (let i = 0; i < listCart.length; i++) {
        total += listCart[i].GiaMoi;
      }

      var ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

      const vnpay = require("../../config/vnpay");

      var tmnCode = vnpay.vnp_TmnCode;
      var secretKey = vnpay.vnp_HashSecret;
      var vnpUrl = vnpay.vnp_Url;
      var returnUrl = vnpay.vnp_ReturnUrl;

      let date = new Date();
      let createDate = moment(date).format("YYYYMMDDHHmmss");

      let orderId = moment(date).format("DDHHmmss");

      var amount = total;
      var bankCode = "NCB";

      var orderInfo = "Noi dung thanh toan";
      var orderType = "billpayment";
      var locale = "vn";
      if (locale === null || locale === "" || locale === "vn") {
        locale = "vn";
      }
      var currCode = "VND";
      var vnp_Params = {};
      vnp_Params["vnp_Version"] = "2.1.0";
      vnp_Params["vnp_Command"] = "pay";
      vnp_Params["vnp_TmnCode"] = tmnCode;
      // vnp_Params['vnp_Merchant'] = ''
      vnp_Params["vnp_Locale"] = locale;
      vnp_Params["vnp_CurrCode"] = currCode;
      vnp_Params["vnp_TxnRef"] = orderId;
      vnp_Params["vnp_OrderInfo"] = orderInfo;
      vnp_Params["vnp_OrderType"] = orderType;
      vnp_Params["vnp_Amount"] = amount * 100;
      vnp_Params["vnp_ReturnUrl"] = returnUrl;
      vnp_Params["vnp_IpAddr"] = ipAddr;
      vnp_Params["vnp_CreateDate"] = createDate;
      if (bankCode !== null && bankCode !== "") {
        vnp_Params["vnp_BankCode"] = bankCode;
      }

      vnp_Params = this.sortObject(vnp_Params);

      var querystring = require("qs");
      var signData = querystring.stringify(vnp_Params, { encode: false });
      var crypto = require("crypto");
      var hmac = crypto.createHmac("sha512", secretKey);
      var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
      vnp_Params["vnp_SecureHash"] = signed;
      vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

      res.status(200).json({
        data: vnpUrl,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    }
  };

  returnPayment = async (req, res) => {
    try {
      let vnp_Params = req.query;

      let secureHash = vnp_Params["vnp_SecureHash"];

      delete vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_SecureHashType"];

      vnp_Params = this.sortObject(vnp_Params);

      const vnpay = require("../../config/vnpay");

      var tmnCode = vnpay.vnp_TmnCode;
      var secretKey = vnpay.vnp_HashSecret;

      let querystring = require("qs");
      let signData = querystring.stringify(vnp_Params, { encode: false });
      let crypto = require("crypto");
      let hmac = crypto.createHmac("sha512", secretKey);
      let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

      if (secureHash === signed) {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

        res.status(200).json({
          data: vnp_Params["vnp_ResponseCode"],
        });
      } else {
        res.status(200).json({
          data: "97",
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

module.exports = new HomeController();
