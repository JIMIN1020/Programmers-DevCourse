const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.use(express.json());

router.post("/", cartController.addCartItem); // 장바구니 담기
router.get("/", cartController.getCartItems); // 장바구니 도서 조회
router.delete("/:cartItemId", cartController.deleteCartItem); // 장바구니 도서 삭제

module.exports = router;
