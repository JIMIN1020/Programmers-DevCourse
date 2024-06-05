import { useEffect, useState } from "react";
import { Cart } from "../models/cart.model";
import { deleteCartItem, fetchCart } from "../api/cart.api";

export const useCart = () => {
  const [cart, setCart] = useState<Cart[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const deleteCart = (id: number) => {
    deleteCartItem(id).then((res) => {
      setCart(cart.filter((item) => item.id !== id));
    });
  };

  useEffect(() => {
    fetchCart().then((res) => {
      if (res.isSuccess) {
        setCart(res.result);
        setIsEmpty(false);
      } else {
        setCart([]);
        setIsEmpty(true);
      }
    });
  }, []);

  return { cart, isEmpty, deleteCart };
};
