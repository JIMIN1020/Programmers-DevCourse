const { StatusCodes } = require("http-status-codes");
const cartService = require("../services/cartService");
const cartQuery = require("../queries/cartQuery");
const verifyToken = require("../functions/verifyToken");
const valid = require("../functions/validationCheck");

/* ----- 장바구니 담기 API ----- */
const addCartItem = [
  valid.quantityValidation(),
  valid.bookIdValidation_body(),
  valid.validationCheck,
  async (req, res) => {
    try {
      const { bookId, quantity } = req.body;
      const token = verifyToken(req);

      let values = [bookId, quantity, token.id];
      const result = await cartService.addCartItem(values);
      res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
      res.status(err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR).json({
        isSuccess: false,
        message: err.message,
      });
    }
  },
];

/* ----- 장바구니 도서 조회 API ----- */
const getCartItems = [
  async (req, res) => {
    try {
      const { selectedItems } = req.body;
      const token = verifyToken(req);

      let sql = cartQuery.getCartItems;
      // 선택 조회
      if (selectedItems) {
        sql += cartQuery.getSelecItems;
        let values = [token.id, selectedItems];
        const result = await cartService.getCartItems(sql, values);
        res.status(StatusCodes.OK).json(result);
      }
      // 전체 조회
      else {
        const result = await cartService.getCartItems(sql, token.id);
        res.status(StatusCodes.OK).json(result);
      }
    } catch (err) {
      res.status(err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR).json({
        isSuccess: false,
        message: err.message,
      });
    }
  },
];

/* ----- 장바구니 도서 삭제 API ----- */
const deleteCartItem = [
  valid.cartItemIdValidation(),
  valid.validationCheck,
  async (req, res) => {
    const { cartItemId } = req.params;

    try {
      verifyToken(req);
      const result = await cartService.deleteCartItem(cartItemId);
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      res.status(err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR).json({
        isSuccess: false,
        message: err.message,
      });
    }
  },
];

module.exports = { addCartItem, getCartItems, deleteCartItem };
