const { body, validationResult, query, param } = require("express-validator");

/* ----- user 유효성 검증 함수 ----- */
const emailValidation = () =>
  body("email").notEmpty().isEmail().withMessage("email이 유효하지 않습니다.");

const pwValidation = () =>
  body("password")
    .notEmpty()
    .isString()
    .withMessage("password가 유효하지 않습니다.");

/* ----- book 유효성 검증 함수 ----- */
const limitValidation = () =>
  query("limit")
    .notEmpty()
    .isNumeric()
    .withMessage("요청 값을 다시 확인해주세요.");

const pageValidation = () =>
  query("page")
    .notEmpty()
    .isNumeric()
    .withMessage("요청 값을 다시 확인해주세요.");

const bookIdValidation = () =>
  param("bookId").notEmpty().withMessage("요청 값을 다시 확인해주세요.");

/* ----- cart 유효성 검증 함수 ----- */
const quantityValidation = () =>
  body("quantity")
    .notEmpty()
    .isNumeric()
    .withMessage("요청 값을 다시 확인해주세요.");

const bookIdValidation_body = () =>
  body("bookId").notEmpty().withMessage("요청 값을 다시 확인해주세요.");

const selectedItemsValidation = () =>
  body("selectedItems")
    .notEmpty()
    .isArray()
    .withMessage("요청 값을 다시 확인해주세요.");

const cartItemIdValidation = () =>
  param("cartItemId").notEmpty().withMessage("요청 값을 다시 확인해주세요.");

/* ----- like 유효성 검증 함수 ----- */
const likedBookValidation = () =>
  param("liked_bookId").notEmpty().withMessage("요청 값을 다시 확인해주세요.");

/* ----- order 유효성 검증 함수 ----- */
const orderIdValidation = () =>
  param("orderId").notEmpty().withMessage("요청 값을 다시 확인해주세요.");

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
  validationCheck,
  limitValidation,
  pageValidation,
  bookIdValidation,
  quantityValidation,
  selectedItemsValidation,
  cartItemIdValidation,
  bookIdValidation_body,
  likedBookValidation,
  orderIdValidation,
};
