const conn = require("../db/connection");
const bookQuery = require("../queries/bookQuery");
const CustomError = require("../CustomError");
const { StatusCodes } = require("http-status-codes");

/* ----- 전체 도서 조회 ----- */
const getAllBooks = async () => {
  try {
    const result = await conn.query(bookQuery.getAllBook);

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

/* ----- 카테고리별 도서 목록 조회 ----- */
const getCategoryList = async (categoryId) => {
  try {
    const result = await conn.query(bookQuery.getCategoryList, categoryId);

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
const getBookDetail = async (id) => {
  try {
    const result = await conn.query(bookQuery.getBookDetail, id);

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
  getCategoryList,
  getBookDetail,
};
