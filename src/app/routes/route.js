const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authMiddleware");

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
const commentFront = require("./frontend/CommentRoutes");

// admin
const khoahoc = require("./admin/KhoaHocRoutes");
const hoadon = require("../routes/admin/HoaDonRoutes");
const nguoidung = require("../routes/admin/NguoiDungRoutes");
const lession = require("../routes/admin/LessionRoutes");
const video = require("../routes/admin/VideoRoutes");
const detailCate = require("../routes/admin/DetailCategoryRoutes");
const cate = require("../routes/admin/CategoryRoutes");
const convention = require("../routes/admin/ConventionRoutes");
const test = require("../routes/admin/TestRoutes");
const profileAdmin = require("../routes/admin/ProfileRoutes");
const blogAdmin = require("../routes/admin/BlogRoutes");
const level = require("../routes/admin/LevelRoutes");
const comment = require("../routes/admin/CommentRoutes");
const usmanage = require("../routes/admin/UserManageRoutes");
const tested = require("../routes/admin/TestedRoutes");
const collectionAdmin = require("../routes/admin/CollectionRoutes");

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
router.use("/comment", commentFront);

// router.use("/admin/khoahoc",authenticate, khoahoc);
router.use("/admin/khoahoc", khoahoc);
router.use("/admin/hoadon", hoadon);
router.use("/admin/nguoidung", nguoidung);
router.use("/admin/lession", lession);
router.use("/admin/video", video);
router.use("/admin/category", cate);
router.use("/admin/detail-category", detailCate);
router.use("/admin/convention", convention);
router.use("/admin/test", test);
router.use("/admin/profile", profileAdmin);
router.use("/admin/blog", blogAdmin);
router.use("/admin/level", level);
router.use("/admin/comment", comment);
router.use("/admin/usmanage", usmanage);
router.use("/admin/tested", tested);
router.use("/admin/collection", collectionAdmin);

module.exports = router;
