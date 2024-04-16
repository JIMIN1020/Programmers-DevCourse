const CustomError = require("../CustomError");
const conn = require("../db/connection");
const cartQuery = require("../queries/cartQuery");
const { StatusCodes } = require("http-status-codes");

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
const getCartItems = async (sql, values) => {
  try {
    const result = await conn.query(sql, values);
    const cartData = result[0];

    if (cartData.length) {
      return {
        isSuccess: true,
        result: cartData,
      };
    } else {
      throw new Error("장바구니에 도서가 없습니다.");
    }
  } catch (err) {
    throw new CustomError(StatusCodes.BAD_REQUEST, err.message);
  }
};

/* ----- 장바구니 도서 삭제 API ----- */
const deleteCartItem = async (id) => {
  try {
    const result = await conn.query(cartQuery.deleteCartItem, id);

    if (result[0].affectedRows > 0) {
      return {
        isSuccess: true,
        message: "장바구니 도서 삭제 완료",
      };
    } else {
      return {
        isSuccess: false,
        message: "삭제할 도서가 없습니다.",
      };
    }
  } catch (err) {
    throw new CustomError(StatusCodes.BAD_REQUEST, err.message);
  }
};

module.exports = {
  addCartItem,
  getCartItems,
  deleteCartItem,
};
