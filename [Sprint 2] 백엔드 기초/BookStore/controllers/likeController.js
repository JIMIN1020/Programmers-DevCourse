// 4월 15일 과제 - 류지민

const { StatusCodes } = require("http-status-codes");
const likeService = require("../services/likeService");

/* ----- 좋아요 추가 API ----- */
const addLike = async (req, res) => {
  const { userId } = req.body;
  const { liked_bookId } = req.params;
  let values = [userId, +liked_bookId];

  try {
    const result = await likeService.addLike(values);
    res.status(StatusCodes.CREATED).json(result);
  } catch (err) {
    res.status(err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

/* ----- 좋아요 삭제 API ----- */
const deleteLike = async (req, res) => {
  const { userId } = req.body;
  const { liked_bookId } = req.params;
  let values = [userId, +liked_bookId];

  try {
    const result = await likeService.deleteLike(values);
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    res.status(err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

module.exports = {
  addLike,
  deleteLike,
};
