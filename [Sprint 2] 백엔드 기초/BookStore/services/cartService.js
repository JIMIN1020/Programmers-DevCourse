const CustomError = require("../CustomError");
const conn = require("../db/connection");
const cartQuery = require("../queries/cartQuery");

/* ----- 장바구니 담기 API ----- */
const addCartItem = async (values) => {
  try {
    const result = await conn.query(cartQuery.addCartItem, values);

    if (result[0].affectedRows > 0) {
      return {
        isSuccess: true,
        message: "장바구니 추가 완료",
      };
    }
  } catch (err) {
    throw new CustomError(StatusCodes.BAD_REQUEST, err.message);
  }
};

/* ----- 장바구니 도서 조회 API ----- */
const getCartItems = async (userId) => {
  try {
    const result = await conn.query(cartQuery.getCartItems, userId);
    const cartData = result[0];

    if (cartData) {
      return {
        isSuccess: true,
        result: cartData,
      };
    } else {
      throw new Error("장바구니에 담긴 도서가 없습니다.");
    }
  } catch (err) {
    throw new CustomError(StatusCodes.BAD_REQUEST, err.message);
  }
};

module.exports = { addCartItem, getCartItems };
