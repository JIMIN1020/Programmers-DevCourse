const { StatusCodes } = require("http-status-codes");
const cartService = require("../services/cartService");
const cartQuery = require("../queries/cartQuery");

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
  const { userId, selectedItems } = req.body;
  try {
    let sql = cartQuery.getCartItems;
    // 선택 조회
    if (selectedItems) {
      sql += cartQuery.getSelecItems;
      let values = [userId, selectedItems];
      const result = await cartService.getCartItems(sql, values);
      res.status(StatusCodes.OK).json(result);
    }
    // 전체 조회
    else {
      const result = await cartService.getCartItems(sql, userId);
      res.status(StatusCodes.OK).json(result);
    }
  } catch (err) {
    res.status(err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

/* ----- 장바구니 도서 삭제 API ----- */
const deleteCartItem = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await cartService.deleteCartItem(id);
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    res.status(err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

module.exports = { addCartItem, getCartItems, deleteCartItem };
