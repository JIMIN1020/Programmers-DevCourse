const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");

router.use(express.json());

router.post("/:liked_bookId", likeController.addLike); // 좋아요 추가
router.delete("/:liked_bookId", likeController.deleteLike); // 좋아요 삭제

module.exports = router;
