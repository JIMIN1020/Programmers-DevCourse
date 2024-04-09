const express = require("express");
const router = express.Router();

router.use(express.json());

/* ----- 좋아요 추가 API ----- */
router.post("/:id", (req, res) => {});

/* ----- 좋아요 취소 API ----- */
router.delete("/:id", (req, res) => {});

module.exports = router;
