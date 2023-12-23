const express = require("express");
const router = express.Router();

const tested = require("../../controllers/admin/TestedController");
const jwtMiddleware = require("../../middlewares/jwtMiddleware");

router.get("/list/:id", tested.list);
router.post("/create", tested.create);

router.post("/delete", tested.delete);
router.get("/detail/:id", tested.detail);
router.post("/update", tested.update);  

router.get("/list/tests/:id", tested.listTests);
router.get("/list/users/:id", tested.listUser);

module.exports = router;
