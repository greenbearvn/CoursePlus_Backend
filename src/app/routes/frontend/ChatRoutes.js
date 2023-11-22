const express = require("express");
const router = express.Router();

const chat = require("../../controllers/frontend/ChatController");

router.get("/session/user", chat.getUser);


module.exports = router;
