const express = require("express");
const router = express.Router();

const nguoidung = require("../../controllers/frontend/AccountController");

router.post("/register", nguoidung.register);

router.post("/login", nguoidung.login);

router.post("/authen", nguoidung.authen);
router.get("/getUser", nguoidung.getUser);
router.post("/logout", nguoidung.logout);

module.exports = router;