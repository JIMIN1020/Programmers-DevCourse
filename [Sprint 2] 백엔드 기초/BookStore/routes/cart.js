const express = require("express");
const router = express.Router();

router.use(express.json());

/* ----- 장바구니 담기 API ----- */
router.post("/", (req, res) => {});

/* ----- 장바구니 조회 API ----- */
router.get("/", (req, res) => {});

/* ----- 장바구니 삭제 API ----- */
router.delete("/:id", (req, res) => {});

module.exports = router;
