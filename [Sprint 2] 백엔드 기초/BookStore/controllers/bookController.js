// 4월 11일 과제 - 류지민

const bookService = require("../services/bookService");
const { StatusCodes } = require("http-status-codes");

/* ----- 전체 도서 & 카테고리별 목록 조회 ----- */
const getAllBooks = async (req, res) => {
  let { categoryId } = req.query;

  try {
    if (categoryId) {
      const result = await bookService.getCategoryList(categoryId);
      res.status(StatusCodes.OK).json(result);
    } else {
      const result = await bookService.getAllBooks();
      res.status(StatusCodes.OK).json(result);
    }
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
