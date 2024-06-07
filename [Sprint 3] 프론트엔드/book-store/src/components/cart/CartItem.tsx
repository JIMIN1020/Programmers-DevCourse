import React, { useMemo } from "react";
import styled from "styled-components";
import { Cart } from "@/models/cart.model";
import Button from "../common/Button";
import Title from "../common/Title";
import { formatNumber } from "@/utils/format";
import CheckButton from "./CheckButton";
import { useAlert } from "@/hooks/useAlert";

interface Props {
  cart: Cart;
  checkedItem: number[];
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
}

function CartItem({ cart, checkedItem, onCheck, onDelete }: Props) {
  const { showConfirm } = useAlert();
  const isChecked = useMemo(() => {
    return checkedItem.includes(cart.id);
  }, [checkedItem, cart.id]);

  const handleCheck = () => {
    onCheck(cart.id);
  };

  const handleDeleteItem = () => {
    showConfirm("정말 삭제하시겠습니까?", () => {
      onDelete(cart.id);
    });
  };

  return (
    <ItemStyle>
      <div className="info">
        <div className="check">
          <CheckButton isChecked={isChecked} onCheck={handleCheck} />
        </div>
        <div>
          <Title size="md">{cart.title}</Title>
          <p className="summary">{cart.summary}</p>
          <p className="price">{formatNumber(cart.price)}</p>
          <p className="quantity">{cart.quantity}</p>
        </div>
      </div>
      <Button size="md" scheme="normal" onClick={handleDeleteItem}>
        장바구니 삭제
      </Button>
    </ItemStyle>
  );
}

export default CartItem;

const ItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.color.borderRadius};
  padding: 12px;

  .info {
    display: flex;
    align-items: start;
    flex: 1;

    .check {
      width: 40px;
      flex-shrink: 0;
    }

    p {
      padding: 0 0 8px 0;
    }
  }
`;
