const orderService = require("../services/orderService");
const { StatusCodes } = require("http-status-codes");
const verifyToken = require("../functions/verifyToken");
const valid = require("../functions/validationCheck");

/* ----- 주문 API ----- */
const order = async (req, res) => {
  try {
    const token = verifyToken(req);
    const result = await orderService.order(req.body, token.id);
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
  try {
    const token = verifyToken(req);
    const result = await orderService.getOrderList(token.id);
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      isSuccess: false,
      message: err.message,
    });
  }
};
/* ----- 주문 상세 조회 API ----- */
const getOrderDetail = [
  valid.orderIdValidation(),
  valid.validationCheck,
  async (req, res) => {
    const { orderId } = req.params;
    try {
      const result = await orderService.getOrderDetail(orderId);
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        isSuccess: false,
        message: err.message,
      });
    }
  },
];

module.exports = { order, getOrderList, getOrderDetail };
