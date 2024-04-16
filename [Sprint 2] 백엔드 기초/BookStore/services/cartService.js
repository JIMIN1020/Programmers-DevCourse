const CustomError = require("../CustomError");
const conn = require("../db/connection");
const cartQuery = require("../queries/cartQuery");

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

module.exports = { addCartItem };
