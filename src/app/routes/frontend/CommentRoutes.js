const express = require("express");
const router = express.Router();

const comment = require("../../controllers/frontend/CommentController");

router.get("/list/comments/:id", comment.list);
router.get("/check/:id", comment.checkCmtOfUser);
router.post("/delete", comment.delete);

module.exports = router;
