const conn = require("../db/connection");
const jwt = require("jsonwebtoken");
const userQuery = require("../query/userQuery");
require("dotenv").config();

/* ----- 로그인 API ----- */
exports.userLogin = async (userData) => {
  try {
    // DB 쿼리
    const queryResult = await conn.query(userQuery.getUser, userData.email);
    const result = queryResult[0][0];

    // 이메일이 존재하지 않는 경우
    if (!result) {
      const error = new Error("존재하지 않는 이메일입니다.");
      throw error;
    }

    // 비밀번호가 일치하지 않는 경우
    if (result.pw !== userData.pw) {
      const error = new Error("비밀번호가 일치하지 않습니다.");
      throw error;
    }

    // 토큰 생성
    const token = jwt.sign(
      {
        email: result.email,
        name: result.name,
      },
      process.env.PRIVATE_KEY,
      {
        expiresIn: "1h",
        issuer: "jm",
      }
    );

    // 로그인 성공 응답
    return {
      isSuccess: true,
      message: `${result.name}님, 로그인 되었습니다.`,
      token: token,
    };
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};

/* ----- 회원가입 API ----- */
exports.userJoin = async (userData) => {
  const values = [userData.email, userData.name, userData.pw];

  try {
    await conn.query(userQuery.joinUser, values);

    return {
      isSuccess: true,
      message: `${userData.name}님, 환영합니다!`,
    };
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};

/* ----- 회원 개별 조회 API ----- */
exports.userInfo = async (email) => {
  try {
    const results = await conn.query(userQuery.getUser, email);

    if (results.length > 0) {
      return {
        isSuccess: true,
        result: results[0],
      };
    } else {
      const error = new Error("존재하지 않는 이메일입니다.");
      throw error;
    }
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};

/* ----- 회원 탈퇴 API ----- */
exports.userDelete = async (email) => {
  try {
    const results = await conn.query(userQuery.deleteUser, email);

    if (results[0].affectedRows > 0) {
      return {
        isSuccess: true,
        message: `회원 탈퇴가 정상적으로 처리되었습니다.`,
      };
    } else {
      const error = new Error("존재하지 않는 회원입니다.");
      throw error;
    }
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};
