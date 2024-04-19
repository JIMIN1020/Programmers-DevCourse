const orderService = require("../services/orderService");
const { StatusCodes } = require("http-status-codes");

/* ----- 주문 API ----- */
const order = async (req, res) => {
  try {
    const result = await orderService.order(req.body);
    res.status(StatusCodes.CREATED).json(result);
  } catch (err) {
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

/* ----- 주문 목록 조회 API ----- */
const getOrderList = async (req, res) => {
  const { userId } = req.body;
  try {
    const result = await orderService.getOrderList(userId);
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      isSuccess: false,
      message: err.message,
    });
  }
};
/* ----- 주문 상세 조회 API ----- */
const getOrderDetail = (req, res) => {
  //
};

module.exports = { order, getOrderList, getOrderDetail };
