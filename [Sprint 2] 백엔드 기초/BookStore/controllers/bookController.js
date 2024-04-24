// 4월 12일 과제 - 류지민

const bookService = require("../services/bookService");
const bookQuery = require("../queries/bookQuery");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../CustomError");
const verifyToken = require("../functions/verifyToken");
const valid = require("../functions/validationCheck");

/* ----- 도서 목록 조회 ----- */
const getAllBooks = [
  valid.limitValidation(),
  valid.pageValidation(),
  valid.validationCheck,
  async (req, res) => {
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
      sql += ` LIMIT ${+limit} OFFSET ${(page - 1) * limit}`;

      const result = await bookService.getAllBooks(sql, values, page);
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        isSuccess: false,
        message: err.message,
      });
    }
  },
];

/* ----- 도서 상세 조회 ----- */
const getBookDetail = [
  valid.bookIdValidation(),
  valid.validationCheck,
  async (req, res) => {
    const bookId = +req.params.bookId;
    try {
      // 로그인 상태이면 -> 좋아요 여부 포함
      if (req.headers["authorization"]) {
        const token = verifyToken(req);
        const values = [token.id, bookId];
        const result = await bookService.getBookDetail(
          bookQuery.getBookDetail,
          values
        );
        res.status(StatusCodes.OK).json(result);
      }
      // 로그인 상태가 아니면 좋아요 여부 미포함
      else {
        const result = await bookService.getBookDetail(
          bookQuery.getBookDetailNotLogin,
          bookId
        );
        res.status(StatusCodes.OK).json(result);
      }
    } catch (err) {
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        isSuccess: false,
        message: err.message,
      });
    }
  },
];

module.exports = {
  getAllBooks,
  getBookDetail,
};
