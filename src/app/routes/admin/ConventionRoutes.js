const express = require("express");
const router = express.Router();

const convention = require("../../controllers/admin/ConventionController");
const jwtMiddleware = require("../../middlewares/jwtMiddleware");
const upload = require("../../middlewares/uploadImgMiddleware");

router.get("/list", convention.list);
router.post("/create", convention.create);
router.post("/update", convention.update);
router.post("/delete", convention.delete);
router.get("/detail/:id", convention.detail);

router.post("/insert/message", convention.insertMessages);
// router.post("/insert/userconvention", convention.insertUser);
router.get("/list/user", convention.getListUser);
router.get("/list/userconvention/:id", convention.getListUserConvention);

module.exports = router;
