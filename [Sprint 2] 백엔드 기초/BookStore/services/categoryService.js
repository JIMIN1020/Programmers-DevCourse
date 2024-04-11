const conn = require("../db/connection");
const categoryQuery = require("../queries/categoryQuery");
const CustomError = require("../CustomError");
const { StatusCodes } = require("http-status-codes");

/* ----- 카테고리 전체 조회 ----- */
const getCategories = async () => {
  try {
    const result = await conn.query(categoryQuery.getCategories);

    const categoryData = result[0];

    if (categoryData) {
      return {
        isSuccess: true,
        result: categoryData,
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

module.exports = { getCategories };
