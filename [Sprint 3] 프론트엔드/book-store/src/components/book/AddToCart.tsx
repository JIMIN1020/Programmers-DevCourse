import React, { useState } from "react";
import { BookDetail } from "../../models/book.model";
import InputText from "../common/InputText";
import Button from "../common/Button";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useBook } from "../../hooks/useBook";

interface Props {
  book: BookDetail;
}

function AddToCart({ book }: Props) {
  const [count, setCount] = useState<number>(1);
  const { addToCart, cartAdded } = useBook(book.id.toString());

  return (
    <CartStyle $isAdded={cartAdded}>
      <Wrapper>
        <InputText
          inputType="number"
          value={count}
          onChange={(e) => setCount(+e.target.value)}
        />
        <Button
          size="md"
          scheme="normal"
          onClick={() => setCount((prev) => prev + 1)}
        >
          +
        </Button>
        <Button
          size="md"
          scheme="normal"
          onClick={() => setCount((prev) => (prev === 1 ? 1 : prev - 1))}
        >
          -
        </Button>
      </Wrapper>
      <Button size="md" scheme="primary" onClick={() => addToCart(count)}>
        장바구니 담기
      </Button>
      <div className="added">
        <p>장바구니에 추가되었습니다.</p>
        <Link to="/cart">장바구니로 이동</Link>
      </div>
    </CartStyle>
  );
}

export default AddToCart;

const CartStyle = styled.div<{ $isAdded: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .added {
    position: absolute;
    right: 0;
    bottom: -90px;
    background: ${({ theme }) => theme.color.background};
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: 8px 12px;
    opacity: ${({ $isAdded }) => ($isAdded ? 1 : 0)};
    transition: all 0.3s ease-in-out;

    p {
      padding: 0 0 8px 0;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 2px;
`;
