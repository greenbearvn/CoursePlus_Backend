const express = require("express");
const router = express.Router();

const home = require("../../controllers/frontend/HomeController");

router.get("/test/:id", home.home);

router.get("/home/choices", home.choices);



module.exports = router;
