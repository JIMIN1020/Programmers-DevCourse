const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.use(express.json());

router.post("/join", userController.join); // 회원가입
router.post("/login", userController.login); // 로그인
router.post("/reset", userController.requestResetPassword); // 비밀번호 초기화 요청
router.put("/reset", userController.resetPassword); // 비밀번호 초기화

module.exports = router;
