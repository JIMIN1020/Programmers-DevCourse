import { OrderType } from "../models/order.model";
import { httpClient } from "./http";

export const order = async (orderData: OrderType) => {
  try {
    const response = await httpClient.post("/order", orderData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
