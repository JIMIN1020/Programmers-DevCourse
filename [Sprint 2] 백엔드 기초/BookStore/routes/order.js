const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.use(express.json());

router.post("/", orderController.order); // 주문
router.get("/", orderController.getOrderList); // 주문 목록 조회
router.get("/:id", orderController.getOrderDetail); // 주문 상세 조회

module.exports = router;
