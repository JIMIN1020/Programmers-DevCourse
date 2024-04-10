// 4월 10일 과제 제출 - 류지민

const conn = require("../db/connection");
const userQuery = require("../queries/userQuery");
const CustomError = require("../CustomError");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

/* ----- 회원가입 ----- */
const join = async (email, password) => {
  try {
    // 비밀번호 암호화
    const salt = crypto.randomBytes(10).toString("base64");
    const hashPassword = crypto
      .pbkdf2Sync(password, salt, 10000, 10, "sha512")
      .toString("base64");

    // 암호화된 비밀번호, salt를 함께 저장
    const result = await conn.query(userQuery.join, [
      email,
      hashPassword,
      salt,
    ]);

    if (result[0].affectedRows > 0) {
      return {
        isSuccess: true,
        message: "정상적으로 회원가입 되었습니다.",
      };
    }
  } catch (err) {
    throw new CustomError(StatusCodes.BAD_REQUEST, err.message);
  }
};

/* ----- 로그인 ----- */
const login = async (email, password) => {
  try {
    const result = await conn.query(userQuery.getUser, email);
    const userData = result[0][0];

    // salt 값 꺼내서 비밀번호 암호화 -> db와 비교
    const hashPassword = crypto
      .pbkdf2Sync(password, userData.salt, 10000, 10, "sha512")
      .toString("base64");

    // login 로직
    if (userData && userData.password === hashPassword) {
      // jwt 발행
      const token = jwt.sign(
        {
          email: userData.email,
        },
        process.env.PRIVATE_KEY,
        { expiresIn: "5m", issuer: "jm" }
      );

      return {
        token,
        isSuccess: true,
        message: "정상적으로 로그인되었습니다.",
      };
    } else {
      throw new CustomError(
        StatusCodes.UNAUTHORIZED,
        "존재하지 않는 이메일이거나 비밀번호가 틀렸습니다."
      );
    }
  } catch (err) {
    throw err;
  }
};

/* ----- 비밀번호 초기화 요청 ----- */
const requestResetPassword = async () => {
  try {
    const result = await conn.query(userQuery.getUser, email);
    const userData = result[0][0];

    if (userData) {
      return {
        isSuccess: true,
        email: userData.email,
        message: "비밀번호 초기화 가능",
      };
    } else {
      throw new CustomError(
        StatusCodes.UNAUTHORIZED,
        "존재하지 않는 유저입니다."
      );
    }
  } catch (err) {
    throw err;
  }
};

/* ----- 비밀번호 초기화 ----- */
const resetPassword = async (password, email) => {
  try {
    // 새로운 salt로 비밀번호 암호화
    const salt = crypto.randomBytes(10).toString("base64");
    const hashPassword = crypto
      .pbkdf2Sync(password, salt, 10000, 10, "sha512")
      .toString("base64");

    // 새로운 salt, 해싱된 비밀번호 업데이트
    const result = await conn.query(userQuery.updatePassword, [
      hashPassword,
      salt,
      email,
    ]);

    if (result[0].affectedRows > 0) {
      return {
        isSuccess: true,
        message: "비밀번호가 수정되었습니다.",
      };
    }
  } catch (err) {
    throw err;
  }
};

module.exports = { join, login, requestResetPassword, resetPassword };
