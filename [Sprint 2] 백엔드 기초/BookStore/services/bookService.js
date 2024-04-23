const conn = require("../db/connection");
const bookQuery = require("../queries/bookQuery");
const CustomError = require("../CustomError");
const { StatusCodes } = require("http-status-codes");

/* ----- 전체 도서 조회 ----- */
const getAllBooks = async (sql, values, page) => {
  try {
    // 전체 도서 개수 조회
    const count = await conn.query(bookQuery.getBookCount);
    const total_count = count[0][0].total_count;

    // 도서 목록 조회
    const result = await conn.query(sql, values);
    const bookData = result[0];

    if (bookData) {
      return {
        isSuccess: true,
        result: {
          pagination: {
            total_count,
            current_page: page,
          },
          books: bookData,
        },
      };
    } else {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        "데이터가 존재하지 않습니다."
      );
    }
  } catch (err) {
    throw err;
  }
};

/* ----- 도서 상세 조회 ----- */
const getBookDetail = async (sql, values) => {
  try {
    const result = await conn.query(sql, values);

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
