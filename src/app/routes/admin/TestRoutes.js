const express = require("express");
const router = express.Router();

const test = require("../../controllers/admin/TestController");
const jwtMiddleware = require("../../middlewares/jwtMiddleware");

router.get("/list", test.list);
router.post("/create", test.create);
router.post("/update", test.update);
router.post("/delete", test.delete);
router.get("/detail/:id", test.detail);

// router.post("/insert/message", convention.insertMessages);
// router.post("/insert/userconvention", convention.insertUser);
// router.get("/list/user", convention.getListUser);
// router.get("/list/userconvention/:id", convention.getListUserConvention);

module.exports = router;
