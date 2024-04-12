// 4월 12일 과제 - 류지민

const bookService = require("../services/bookService");
const bookQuery = require("../queries/bookQuery");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../CustomError");

/* ----- 도서 목록 조회 ----- */
const getAllBooks = async (req, res) => {
  let { limit, page, categoryId, newly } = req.query;

  try {
    // sql 구하기 - 전체 / 카테고리별 / 카테고리별 신간 / 전체 신간
    let sql = bookQuery.getAllBook;
    let values = [];

    if (categoryId && newly) {
      sql += bookQuery.getNewlyByCategory;
      values.push(categoryId);
    } else if (categoryId) {
      sql += bookQuery.getAllByCategory;
      values.push(categoryId);
    } else if (newly) {
      sql += bookQuery.getAllNewly;
    }

    // paging 처리
    if (!limit || !page) {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        "요청 값을 다시 확인해주세요."
      );
    } else {
      sql += ` LIMIT ${+limit} OFFSET ${(page - 1) * limit}`;
    }

    const result = await bookService.getAllBooks(sql, values);
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

/* ----- 도서 상세 조회 ----- */
const getBookDetail = async (req, res) => {
  try {
    const result = await bookService.getBookDetail(+req.params.id);
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

module.exports = {
  getAllBooks,
  getBookDetail,
};
