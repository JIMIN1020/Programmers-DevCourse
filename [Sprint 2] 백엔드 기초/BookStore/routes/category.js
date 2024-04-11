// 4월 11일 과제 - 류지민

const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.use(express.json());

router.get("/", categoryController.getCategories); // 카테고리 조회

module.exports = router;
