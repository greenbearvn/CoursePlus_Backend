const express = require("express");
const router = express.Router();

const chat = require("../../controllers/frontend/ChatController");

router.get("/session/user", chat.getUser);
router.get("/chatapp/list/conventions", chat.getUserConventions);


module.exports = router;
