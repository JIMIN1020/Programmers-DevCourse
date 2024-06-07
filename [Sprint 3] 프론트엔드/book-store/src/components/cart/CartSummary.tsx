import React from "react";
import styled from "styled-components";
import { formatNumber } from "@/utils/format";

interface Props {
  totalCount: number;
  totalPrice: number;
}

function CartSummary({ totalCount, totalPrice }: Props) {
  return (
    <SummaryStyle>
      <h1>주문 요약</h1>
      <dl>
        <dt>{totalCount}권</dt>
        <dd></dd>
      </dl>
      <dl>
        <dt>{formatNumber(totalPrice)}원</dt>
        <dd></dd>
      </dl>
    </SummaryStyle>
  );
}

export default CartSummary;

const SummaryStyle = styled.div`
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 12px;
  width: 240px;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }

  dl {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;

    dd {
      font-weight: 700;
    }
  }
`;
