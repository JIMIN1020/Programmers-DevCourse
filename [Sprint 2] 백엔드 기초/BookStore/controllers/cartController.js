const { StatusCodes } = require("http-status-codes");
const cartService = require("../services/cartService");

/* ----- 장바구니 담기 API ----- */
const addCartItem = async (req, res) => {
  const { bookId, quantity, userId } = req.body;
  let values = [bookId, quantity, userId];

  try {
    const result = await cartService.addCartItem(values);
    res.status(StatusCodes.CREATED).json(result);
  } catch (err) {
    res.status(err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

/* ----- 장바구니 도서 조회 API ----- */
const getCartItems = async (req, res) => {
  try {
    const result = await cartService.getCartItems(req.body.userId);
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    res.status(err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

/* ----- 장바구니 도서 삭제 API ----- */
const deleteCartItem = (req, res) => {
  //
};

module.exports = { addCartItem, getCartItems, deleteCartItem };
