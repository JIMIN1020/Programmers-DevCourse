const categoryService = require("../services/categoryService");
const { StatusCodes } = require("http-status-codes");

/* ----- 카테고리 전체 조회 ----- */
const getCategories = async (req, res) => {
  try {
    const result = await categoryService.getCategories();
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

module.exports = { getCategories };
