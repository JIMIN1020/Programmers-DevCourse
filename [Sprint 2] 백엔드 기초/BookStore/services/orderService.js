const CustomError = require("../CustomError");
const conn = require("../db/connection");
const orderQuery = require("../queries/orderQuery");
const { StatusCodes } = require("http-status-codes");

/* ----- 주문 API ----- */
const order = async (data) => {
  const { items, book_title, delivery, total_count, total_price, user_id } =
    data;

  try {
    // 배송 정보 INSERT
    const del_result = await conn.query(orderQuery.addDelivery, [
      delivery.address,
      delivery.receiver,
      delivery.contact,
    ]);
    const delivery_id = del_result[0].insertId; // 방금 insert한 배송정보 id

    // 주문 정보 INSERT
    const order_result = await conn.query(orderQuery.addOrder, [
      book_title,
      total_count,
      total_price,
      user_id,
      delivery_id,
    ]);
    const order_id = order_result[0].insertId; // 방금 insert한 주문 id

    // // 주문 도서 목록 꺼내기
    let values = [];
    items.forEach(async (item) => {
      values.push([order_id, item.book_id, item.quantity]);
    });

    // 주문 도서 목록 INSERT
    await conn.query(orderQuery.addOrderItems, [values]);

    return {
      isSuccess: true,
      message: "주문 완료",
    };
  } catch (err) {
    throw new CustomError(StatusCodes.BAD_REQUEST, err.message);
  }
};

/* ----- 주문 목록 조회 API ----- */
const getOrderList = () => {
  //
};
/* ----- 주문 상세 조회 API ----- */
const getOrderDetail = () => {
  //
};

module.exports = { order, getOrderList, getOrderDetail };
