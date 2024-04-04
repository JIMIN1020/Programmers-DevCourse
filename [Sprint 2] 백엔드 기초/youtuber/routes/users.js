const express = require("express");
const router = express.Router();
const userContoroller = require("../controllers/userController");
router.use(express.json());

router.post("/login", userContoroller.login); // 로그인
router.post("/join", userContoroller.join); // 회원 가입

router
  .route("/users")
  .get(userContoroller.getUser) // 회원 개별 조회
  .delete(userContoroller.deleteUser); // 회원 탈퇴

module.exports = router;
