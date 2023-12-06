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
// admin
const khoahoc = require("./admin/KhoaHocRoutes");
const hoadon  = require("../routes/admin/HoaDonRoutes")

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

// router.use("/admin/khoahoc",authenticate, khoahoc);
router.use("/admin/khoahoc", khoahoc);
router.use("/admin/hoadon", hoadon);

module.exports = router;
