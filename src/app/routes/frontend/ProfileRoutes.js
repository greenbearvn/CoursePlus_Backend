const express = require("express");
const router = express.Router();

const profile = require("../../controllers/frontend/ProfileController");

router.get("/person/:id", profile.getProfile);
router.post("/create/convention", profile.createConven);

module.exports = router;
