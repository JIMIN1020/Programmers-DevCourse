const userService = require("../services/userService");
const vaildation = require("../functions/validationCheck");
const { StatusCodes } = require("http-status-codes");

/* ----- 회원가입 ----- */
const join = [
  vaildation.emailValidation(),
  vaildation.pwValidation(),
  vaildation.validationCheck,
  async (req, res) => {
    try {
      // service 호출
      const { email, password } = req.body;
      const result = await userService.join(email, password);
      // 응답
      res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        isSuccess: false,
        message: err.message,
      });
    }
  },
];

/* ----- 로그인 ----- */
const login = [
  vaildation.emailValidation(),
  vaildation.pwValidation(),
  vaildation.validationCheck,
  async (req, res) => {
    try {
      // service 호출
      const { email, password } = req.body;
      const result = await userService.login(email, password);

      // 응답
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        isSuccess: false,
        message: err.message,
      });
    }
  },
];

/* ----- 비밀번호 초기화 요청 ----- */
const requestResetPassword = [
  vaildation.emailValidation(),
  vaildation.validationCheck,
  async (req, res) => {
    try {
      // service 호출
      const email = req.body.email;
      const result = await userService.requestResetPassword(email);
      // 응답
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        isSuccess: false,
        message: err.message,
      });
    }
  },
];

/* ----- 비밀번호 초기화 ----- */
const resetPassword = [
  vaildation.pwValidation(),
  vaildation.validationCheck,
  async (req, res) => {
    try {
      // service 호출
      const { email, password } = req.body;
      const result = await userService.resetPassword(password, email);

      // 응답
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        isSuccess: false,
        message: err.message,
      });
    }
  },
];

module.exports = {
  join,
  login,
  requestResetPassword,
  resetPassword,
};
