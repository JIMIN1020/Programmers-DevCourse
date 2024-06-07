import { OrderType } from "../models/order.model";
import { requestHandler } from "./http";

export const order = async (orderData: OrderType) => {
  return await requestHandler<OrderType>("post", "/order", orderData);
};

export const fetchOrders = async () => {
  return await requestHandler<OrderType>("get", "/order");
};

export const fetchOrderDetail = async (id: number) => {
  return await requestHandler<OrderType>("get", `/order/${id}`);
};
