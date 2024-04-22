require("dotenv").config();
const jwt = require("jsonwebtoken");
const CustomError = require("../CustomError");
const { StatusCodes } = require("http-status-codes");

const verifyToken = (req) => {
  try {
    const token = req.headers["authorization"];
    const decodedJWT = jwt.verify(token, process.env.PRIVATE_KEY);
    return decodedJWT;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new CustomError(
        "로그인 세션이 만료되었습니다.",
        StatusCodes.UNAUTHORIZED
      );
    } else if (err instanceof jwt.JsonWebTokenError) {
      throw new CustomError("잘못된 토큰입니다.", StatusCodes.BAD_REQUEST);
    } else {
      throw err;
    }
  }
};

module.exports = verifyToken;
