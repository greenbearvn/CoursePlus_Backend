const express = require("express");
const router = express.Router();

const chat = require("../../controllers/frontend/ChatController");

router.get("/session/user", chat.getUser);
router.get("/chatapp/list/conventions", chat.getUserConventions);
router.get("/chatapp/messages/convention/:id", chat.getMessagesInConv);
router.get("/chatapp/message/user/profile/:id", chat.getProfileUser);
router.post("/chatapp/message/create", chat.createMessage);
router.post("/chatapp/convention/delete/:id", chat.deleteConv);
router.post("/chatapp/message/delete/:id", chat.deleteMessage);

module.exports = router;
