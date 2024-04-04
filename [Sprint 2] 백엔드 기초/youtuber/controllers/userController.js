const {
  emailValidation,
  pwValidation,
  validationCheck,
  nameValidation,
} = require("../functions/validationCheck");
const userService = require("../services/userService");

/* ----- 로그인 ----- */
exports.login = [
  emailValidation(),
  pwValidation(),
  validationCheck,
  async (req, res) => {
    try {
      const result = await userService.userLogin(req.body); // service 호출

      // 성공 시 응답
      res.cookie("token", result.token, {
        httpOnly: true,
      });
      res
        .status(200)
        .json({ isSuccess: result.isSuccess, message: result.message });
    } catch (err) {
      // 에러 발생 시
      res
        .status(err.status ? err.status : 500)
        .json({ isSuccess: false, message: err.message });
    }
  },
];

/* ----- 회원가입 ----- */
exports.join = [
  emailValidation(),
  pwValidation(),
  nameValidation(),
  validationCheck,
  async (req, res) => {
    try {
      const result = await userService.userJoin(req.body);
      res.status(201).json(result);
    } catch (err) {
      res
        .status(err.status ? err.status : 500)
        .json({ isSuccess: false, message: err.message });
    }
  },
];

/* ----- 회원 개별 조회 ----- */
exports.userInfo = [
  emailValidation(),
  validationCheck,
  async (req, res) => {
    try {
      const result = await userService.userInfo(req.body.email);
      res.status(200).json(result);
    } catch (err) {
      res
        .status(err.status ? err.status : 500)
        .json({ isSuccess: false, message: err.message });
    }
  },
];

/* ----- 회원 탈퇴 ----- */
exports.userDelete = [
  emailValidation(),
  validationCheck,
  async (req, res) => {
    try {
      const result = await userService.userDelete(req.body.email);
      res.status(201).json(result);
    } catch (err) {
      console.log(err);
      res
        .status(err.status ? err.status : 500)
        .json({ isSuccess: false, message: err.message });
    }
  },
];
