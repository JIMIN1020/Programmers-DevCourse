const express = require("express");
const router = express.Router();

router.use(express.json());

/* ----- 전체 도서 조회 API ----- */
router.get("/", (req, res) => {});

/* ----- 카테고리별 목록 조회 API ----- */
router.get("/", (req, res) => {});

/* ----- 도서 상세 조회 API ----- */
router.get("/:id", (req, res) => {});

module.exports = router;
