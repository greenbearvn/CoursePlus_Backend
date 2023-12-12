const express = require("express");
const router = express.Router();


const authenticate = require("../middlewares/authMiddleware")

//client
const home = require("./frontend/HomeRoutes");
const detail = require("./frontend/DetailRoutes");
const quiz = require("./frontend/QuizRoutes");
const cart = require("./frontend/CartRoutes");
const payment = require("./frontend/PaymentRoutes");
const watching = require("./frontend/WatchingRoutes");
const account = require("./frontend/AccountRoutes");
const chat = require("./frontend/ChatRoutes");
const profile = require("./frontend/ProfileRoutes");
const blog = require("./frontend/BlogFrontendRoutes");
const category = require("./frontend/CategoryRoutes");
const collection = require("./frontend/CollectionRoutes");
// admin
const khoahoc = require("./admin/KhoaHocRoutes");
const hoadon  = require("../routes/admin/HoaDonRoutes")
const nguoidung  = require("../routes/admin/NguoiDungRoutes")
const lession  = require("../routes/admin/LessionRoutes")
const video  = require("../routes/admin/VideoRoutes")
const detailCate  = require("../routes/admin/DetailCategoryRoutes")
const cate  = require("../routes/admin/CategoryRoutes")


router.use("/home", home);
router.use("/product", detail);
router.use("/lession", quiz);
router.use("/watching", watching);
router.use("/cart", cart);
router.use("/payment", payment);
router.use("/account", account);
router.use("/chat", chat);
router.use("/profile", profile);
router.use("/blog", blog);
router.use("/category", category);
router.use("/collection", collection);

// router.use("/admin/khoahoc",authenticate, khoahoc);
router.use("/admin/khoahoc", khoahoc);
router.use("/admin/hoadon", hoadon);
router.use("/admin/nguoidung",  nguoidung);
router.use("/admin/lession",  lession);
router.use("/admin/video",  video);
router.use("/admin/category",  cate);
router.use("/admin/detail-category",  detailCate);

module.exports = router;
