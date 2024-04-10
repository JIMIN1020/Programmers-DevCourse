const conn = require("../db/connection");
const userQuery = require("../queries/userQuery");
const CustomError = require("../CustomError");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* ----- 회원가입 ----- */
// TODO error catch
const join = async (values) => {
  try {
    const result = await conn.query(userQuery.join, values);

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

const login = async (email, password) => {
  try {
    const result = await conn.query(userQuery.getUser, email);
    const userData = result[0][0];
    console.log(userData);

    // login 로직
    if (userData && userData.password === password) {
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

module.exports = { join, login };
