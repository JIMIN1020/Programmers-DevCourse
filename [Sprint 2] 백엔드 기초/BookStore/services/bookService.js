const conn = require("../db/connection");
const bookQuery = require("../queries/bookQuery");
const CustomError = require("../CustomError");
const { StatusCodes } = require("http-status-codes");

/* ----- 전체 도서 조회 ----- */
const getAllBooks = async (sql, values) => {
  try {
    const result = await conn.query(sql, values);

    const bookData = result[0];

    if (bookData) {
      return {
        isSuccess: true,
        result: bookData,
      };
    } else {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        "데이터가 존재하지 않습니다."
      );
    }
  } catch (err) {
    throw err;
  }
};

/* ----- 도서 상세 조회 ----- */
const getBookDetail = async (values) => {
  try {
    const result = await conn.query(bookQuery.getBookDetail, values);

    const bookData = result[0][0];

    if (bookData) {
      return {
        isSuccess: true,
        result: bookData,
      };
    } else {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        "존재하지 않는 도서입니다."
      );
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllBooks,
  getBookDetail,
};
