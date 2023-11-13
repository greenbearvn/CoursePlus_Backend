const express = require("express");
const router = express.Router();

const detail = require("../../controllers/frontend/DetailController");

router.get("/detail/:id", detail.detail);
router.get("/detail/lessions/:id", detail.getLession);
router.get("/detail/lessions/videos/:id", detail.getVideo);

module.exports = router;
