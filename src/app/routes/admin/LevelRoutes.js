const express = require("express");
const router = express.Router();

const level = require("../../controllers/admin/LevelController");
const jwtMiddleware = require("../../middlewares/jwtMiddleware");

router.get("/list", level.list);
router.post("/create", level.create);
router.post("/update", level.update);
router.post("/delete", level.delete);
router.get("/detail/:id", level.detail);

module.exports = router;
