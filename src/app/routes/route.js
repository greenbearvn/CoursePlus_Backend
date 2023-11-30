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
// admin
const khoahoc = require("./admin/KhoaHocRoutes");

router.use("/home", home);
router.use("/product", detail);
router.use("/lession", quiz);
router.use("/watching", watching);
router.use("/cart", cart);
router.use("/payment", payment);
router.use("/account", account);
router.use("/chat", chat);
router.use("/profile", profile);

router.use("/admin/khoahoc",authenticate, khoahoc);

module.exports = router;
