const express = require("express");
const router = express.Router();
const conn = require("../db"); // db
const { body, validationResult } = require("express-validator");

router.use(express.json());

router.get("/", (req, res) => {
  res.send("Hello!");
});

/* ----- 유효성 검증 함수 ----- */
const emailValidation = () =>
  body("email").notEmpty().isEmail().withMessage("email이 유효하지 않습니다.");

const pwValidation = () =>
  body("pw").notEmpty().isString().withMessage("password가 유효하지 않습니다.");

const nameValidation = () =>
  body("name").notEmpty().isString().withMessage("name이 유효하지 않습니다.");

/* ----- 유효성 검사 처리 모듈 ----- */
const validationCheck = (req, res, next) => {
  const err = validationResult(req);

  // 유효성 검사를 통과한 경우
  if (err.isEmpty()) {
    return next();
  }
  // 통과하지 못한 경우
  else {
    return res.status(400).json({
      isSuccess: false,
      error: err.array(),
    });
  }
};

/* ----- 로그인 API ----- */
router.post(
  "/login",
  [emailValidation(), pwValidation(), validationCheck],
  (req, res) => {
    const { email, pw } = req.body;
    const sql = `SELECT * FROM users WHERE email = ?`;

    // 회원 이메일이 존재하는지 확인하기
    conn.query(sql, email, (err, results) => {
      // sql 에러
      if (err) {
        return res.status(400).json(err);
      }

      let userData = results[0];

      // 유저가 존재하면? 로그인하기
      if (userData) {
        // 비밀번호 검증
        if (userData.pw === pw) {
          res.status(200).json({
            isSuccess: true,
            message: `${userData.name}님, 로그인 되었습니다.`,
          });
        } else {
          res.status(401).json({
            isSuccess: false,
            message: `비밀번호가 일치하지 않습니다.`,
          });
        }
      }
      // 유저가 존재하지 않으면 404 리턴
      else {
        res.status(404).json({
          isSuccess: false,
          message: `존재하지 않는 이메일입니다.`,
        });
      }
    });
  }
);

/* ----- 회원가입 API ----- */
router.post(
  "/join",
  [emailValidation(), pwValidation(), nameValidation(), validationCheck],
  (req, res) => {
    const { email, name, pw } = req.body; // 신규 유저 정보

    const sql = `INSERT INTO users (email, name, pw) VALUES (?, ?, ?)`;
    const values = [email, name, pw];

    // db에 insert 하기
    conn.query(sql, values, (err) => {
      // 에러가 발생한 경우 400
      if (err) {
        res.status(400).json({
          isSuccess: false,
          message: `요청 값을 다시 확인해주세요.`,
        });
      } else {
        res.status(201).json({
          isSuccess: true,
          message: `${name}님, 환영합니다!`,
        });
      }
    });
  }
);

/* ----- 회원 개별 조회 API ----- */
router
  .route("/users")
  .get([emailValidation(), validationCheck], (req, res) => {
    const { email } = req.body;
    const sql = `SELECT * FROM users WHERE email = ?`;

    // sql 쿼리 작성
    conn.query(sql, email, (_, results) => {
      // 결과값이 있다면 반환, 없다면 404
      if (results.length > 0) {
        res.status(200).json({
          isSuccess: true,
          result: results,
        });
      } else {
        res.status(404).json({
          isSuccess: false,
          message: `회원 정보가 존재하지 않습니다.`,
        });
      }
    });
  })
  /* ----- 회원 탈퇴 API ----- */
  .delete([emailValidation(), validationCheck], (req, res) => {
    const { email } = req.body;
    const sql = `DELETE FROM users WHERE email = ?`;

    // sql 쿼리 작성
    conn.query(sql, email, (err, results) => {
      // 에러가 발생한 경우 400
      if (err) {
        res.status(400).json({
          isSuccess: false,
          message: `요청 값을 다시 확인해주세요.`,
        });
      } else {
        res.status(201).json({
          isSuccess: true,
          results: results,
          message: `회원 탈퇴가 정상적으로 처리되었습니다.`,
        });
      }
    });
  });

module.exports = router;
