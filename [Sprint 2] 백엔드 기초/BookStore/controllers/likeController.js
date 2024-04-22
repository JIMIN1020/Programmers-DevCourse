const { StatusCodes } = require("http-status-codes");
const likeService = require("../services/likeService");
const verifyToken = require("../functions/verifyToken");

/* ----- 좋아요 추가 API ----- */
const addLike = async (req, res) => {
  try {
    const { liked_bookId } = req.params;

    const token = verifyToken(req);
    let values = [token.id, +liked_bookId];
    const result = await likeService.addLike(values);
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    res.status(err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

/* ----- 좋아요 삭제 API ----- */
const deleteLike = async (req, res) => {
  try {
    const { liked_bookId } = req.params;
    const token = verifyToken(req);

    let values = [token.id, +liked_bookId];

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
