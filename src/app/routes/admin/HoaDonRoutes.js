const express = require("express");
const router = express.Router();

const hoadon = require("../../controllers/admin/HoaDonController");
const jwtMiddleware = require("../../middlewares/jwtMiddleware");

router.get("/list", hoadon.lists);
router.get("/list/users", hoadon.getListUser);
router.post("/create", hoadon.create);
router.post("/update", hoadon.update);
router.post("/delete", hoadon.delete);
router.get("/detail/:id", hoadon.detail);
router.get("/list/details/:id", hoadon.getListDetailBill);
router.post("/detail/items/delete", hoadon.deleteDetailItem);


module.exports = router;
