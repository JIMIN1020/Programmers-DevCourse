const CustomError = require("../CustomError");
const conn = require("../db/connection");
const likeQuery = require("../queries/likeQuery");
const { StatusCodes } = require("http-status-codes");

/* ----- 좋아요 추가 API ----- */
const addLike = async (values) => {
  try {
    const result = await conn.query(likeQuery.addLike, values);

    if (result[0].affectedRows > 0) {
      return {
        isSuccess: true,
        message: "좋아요 추가 완료",
      };
    }
  } catch (err) {
    throw new CustomError(StatusCodes.BAD_REQUEST, err.message);
  }
};

/* ----- 좋아요 삭제 API ----- */
const deleteLike = async (values) => {
  try {
    const result = await conn.query(likeQuery.deleteLike, values);

    if (result[0].affectedRows > 0) {
      return {
        isSuccess: true,
        message: "좋아요 삭제 완료",
      };
    }
  } catch (err) {
    throw new CustomError(StatusCodes.BAD_REQUEST, err.message);
  }
};

module.exports = {
  addLike,
  deleteLike,
};
