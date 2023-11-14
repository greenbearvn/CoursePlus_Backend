const express = require("express");
const router = express.Router();

const nguoidung = require("../../controllers/frontend/AccountController");

router.post("/register", nguoidung.register);

router.post("/login", nguoidung.login);



module.exports = router;