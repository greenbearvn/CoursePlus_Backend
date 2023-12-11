const express = require("express");
const router = express.Router();

const nguoidung = require("../../controllers/admin/NguoiDungController");
const jwtMiddleware = require("../../middlewares/jwtMiddleware");

router.get("/list", nguoidung.list);
router.get("/detail/:id", nguoidung.detail)
router.post("/create", nguoidung.create)
router.post("/delete", nguoidung.delete)
router.post("/edit", nguoidung.update)

module.exports = router;
