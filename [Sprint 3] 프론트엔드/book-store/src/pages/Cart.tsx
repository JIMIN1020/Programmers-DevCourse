import React, { useMemo, useState } from "react";
import Title from "../components/common/Title";
import styled from "styled-components";
import CartItem from "../components/cart/CartItem";
import { useCart } from "../hooks/useCart";
import Empty from "../components/common/Empty";
import { FaShoppingCart } from "react-icons/fa";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";
import { useAlert } from "../hooks/useAlert";
import { Order } from "../models/order.model";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const { cart, deleteCart, isEmpty } = useCart();
  const { showAlert, showConfirm } = useAlert();
  const [checkedItem, setChecktedItem] = useState<number[]>([]);

  const handleCheckItem = (id: number) => {
    if (checkedItem.includes(id)) {
      setChecktedItem(checkedItem.filter((item) => item !== id));
    } else {
      setChecktedItem((prev) => [...prev, id]);
    }
  };

  const totalCount = useMemo(() => {
    return cart.reduce((a, cart) => {
      if (checkedItem.includes(cart.id)) {
        return a + cart.quantity;
      }
      return a;
    }, 0);
  }, [cart, checkedItem]);

  const totalPrice = useMemo(() => {
    return cart.reduce((a, cart) => {
      if (checkedItem.includes(cart.id)) {
        return a + cart.price;
      }
      return a;
    }, 0);
  }, [cart, checkedItem]);

  const hanldeOrder = () => {
    if (checkedItem.length === 0) {
      showAlert("주문할 상품을 선택해주세요.");
      return;
    }

    const orderData: Omit<Order, "delivery"> = {
      items: checkedItem,
      total_count: totalCount,
      total_price: totalPrice,
      book_title: cart[0].title,
    };

    showConfirm("주문 하시겠습니까?", () => {
      navigate("/order", { state: orderData });
    });
  };

  return (
    <>
      <Title size="lg">장바구니</Title>
      <CartStyle>
        {!isEmpty && (
          <>
            <div className="content">
              {cart.map((item) => (
                <CartItem
                  checkedItem={checkedItem}
                  onCheck={handleCheckItem}
                  onDelete={deleteCart}
                  key={item.id}
                  cart={item}
                />
              ))}
            </div>
            <div className="summary">
              <CartSummary totalCount={totalCount} totalPrice={totalPrice} />
              <Button size="lg" scheme="primary" onClick={hanldeOrder}>
                주문하기
              </Button>
            </div>
          </>
        )}
        {isEmpty && (
          <Empty
            icon={<FaShoppingCart />}
            title="장바구니가 비었습니다"
            description={<>장바구니를 채워보세요</>}
          />
        )}
      </CartStyle>
    </>
  );
}

export default Cart;

const CartStyle = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 24px 0 0 0;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;
