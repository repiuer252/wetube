const express = require("express");
const router = express.Router();
const commentController = require("../Controller/commentController");
const likeCommentController = require("../Controller/likeCommentController");
router.get("", commentController.index);
router.get("/:id", commentController.getById);
router.post("/reply/:id", commentController.reply);
router.post("/:id", commentController.register);
router.put("/like/:id", likeCommentController.like);
router.put("/dislike/:id", likeCommentController.dislike);

module.exports = router;
