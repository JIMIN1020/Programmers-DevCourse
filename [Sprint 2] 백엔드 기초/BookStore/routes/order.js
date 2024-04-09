const express = require("express");
const router = express.Router();

router.use(express.json());

/* ----- 주문 API ----- */
router.post("/", (req, res) => {});

/* ----- 주문 목록 조회 API ----- */
router.get("/", (req, res) => {});

/* ----- 주문 상세 조회 API ----- */
router.get("/:id", (req, res) => {});

module.exports = router;
