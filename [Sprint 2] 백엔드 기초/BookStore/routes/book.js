const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.use(express.json());

router.get("/", bookController.getAllBooks); // 전체 도서 & 카테고리별 도서 목록 조회
router.get("/:id", bookController.getBookDetail); // 도서 상세 조회

module.exports = router;
