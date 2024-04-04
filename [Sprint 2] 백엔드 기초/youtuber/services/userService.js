const conn = require("../db/connection");
const jwt = require("jsonwebtoken");
const userQuery = require("../query/userQuery");
require("dotenv").config();

/* ----- 로그인 API ----- */
exports.login = async (userData) => {
  try {
    // DB 쿼리
    const queryResult = await conn.query(userQuery.getUser, userData.email);
    const result = queryResult[0][0];

    // 이메일이 존재하지 않는 경우
    if (!result) {
      throw new Error("존재하지 않는 회원입니다.");
    }

    // 비밀번호가 일치하지 않는 경우
    if (result.pw !== userData.pw) {
      throw new Error("비밀번호가 일치하지 않습니다.");
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
    throw err;
  }
};

/* ----- 회원가입 API ----- */
exports.join = async (userData) => {
  const values = [userData.email, userData.name, userData.pw];

  try {
    const results = await conn.query(userQuery.joinUser, values);

    if (results[0].affectedRows > 0) {
      return {
        isSuccess: true,
        message: `${userData.name}님, 환영합니다!`,
      };
    } else {
      throw new Error("회원가입을 실패했습니다.");
    }
  } catch (err) {
    throw err;
  }
};

/* ----- 회원 개별 조회 API ----- */
exports.getUser = async (email) => {
  try {
    const results = await conn.query(userQuery.getUser, email);

    if (results.length > 0) {
      return {
        isSuccess: true,
        result: results[0],
      };
    } else {
      throw new Error("존재하지 않는 회원입니다.");
    }
  } catch (err) {
    throw err;
  }
};

/* ----- 회원 탈퇴 API ----- */
exports.deleteUser = async (email) => {
  try {
    const results = await conn.query(userQuery.deleteUser, email);

    if (results[0].affectedRows > 0) {
      return {
        isSuccess: true,
        message: `회원 탈퇴가 정상적으로 처리되었습니다.`,
      };
    } else {
      throw new Error("존재하지 않는 회원입니다.");
    }
  } catch (err) {
    throw err;
  }
};
