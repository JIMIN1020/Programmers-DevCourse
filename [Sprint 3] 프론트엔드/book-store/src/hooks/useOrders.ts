import { useEffect, useState } from "react";
import { OrderListItem } from "../models/order.model";
import { fetchOrderDetail, fetchOrders } from "../api/order.api";

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders().then((res) => {
      if (res.isSuccess) {
        setOrders(res.result);
      }
    });
  }, []);

  const selectOrder = (orderId: number) => {
    if (orders.filter((item) => item.order_id == orderId)[0].detail) {
      setSelectedOrderId(orderId);
      return;
    }

    fetchOrderDetail(orderId).then((res) => {
      if (res.isSuccess) {
        setSelectedOrderId(orderId);
        setOrders(
          orders.map((item) =>
            item.order_id === orderId ? { ...item, detail: res.result } : item
          )
        );
      }
    });
  };

  return { orders, selectedOrderId, selectOrder };
};
