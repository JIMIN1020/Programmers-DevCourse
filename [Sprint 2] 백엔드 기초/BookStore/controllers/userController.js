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
      const result = await userService.join([email, password]);
      // 응답
      res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
      res.status(err.statusCode || 500).json({
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
      const { token, isSuccess, message } = result;

      // token 쿠키로 전달
      res.cookie("token", token, {
        httpOnly: true,
      });
      // 응답
      res.status(StatusCodes.OK).json({ isSuccess, message });
    } catch (err) {
      res.status(err.statusCode || 500).json({
        isSuccess: false,
        message: err.message,
      });
    }
  },
];

/* ----- 비밀번호 초기화 요청 ----- */
const requestResetPassword = [];

/* ----- 비밀번호 초기화 ----- */
const resetPassword = [];

module.exports = {
  join,
  login,
  requestResetPassword,
  resetPassword,
};
