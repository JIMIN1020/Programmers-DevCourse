const bookService = require("../services/bookService");
const bookQuery = require("../queries/bookQuery");
const { StatusCodes } = require("http-status-codes");

/* ----- 도서 목록 조회 ----- */
const getAllBooks = async (req, res) => {
  let { categoryId, newly } = req.query;

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

  try {
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
