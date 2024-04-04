const { body, validationResult, param } = require("express-validator");

/* ----- user 유효성 검증 함수 ----- */
const emailValidation = () =>
  body("email").notEmpty().isEmail().withMessage("email이 유효하지 않습니다.");

const pwValidation = () =>
  body("pw").notEmpty().isString().withMessage("password가 유효하지 않습니다.");

const nameValidation = () =>
  body("name").notEmpty().isString().withMessage("name이 유효하지 않습니다.");

/* ----- channel 유효성 검증 함수 ----- */
const userIdValidation = () =>
  body("userId").notEmpty().isInt().withMessage("userId가 유효하지 않습니다.");

const channelNameValidation = () =>
  body("channelName")
    .notEmpty()
    .isString()
    .withMessage("채널명이 유효하지 않습니다.");

const channelIdValidation = () =>
  param("id").notEmpty().isInt().withMessage("id가 유효하지 않습니다.");

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

module.exports = {
  emailValidation,
  pwValidation,
  nameValidation,
  userIdValidation,
  channelNameValidation,
  channelIdValidation,
  validationCheck,
};
