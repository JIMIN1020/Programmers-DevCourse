import React from "react";
import { FaSmileWink } from "react-icons/fa";
import styled from "styled-components";
import Title from "../common/Title";
import { Link } from "react-router-dom";

function BookEmpty() {
  return (
    <BookEmptyStyle>
      <Icon>
        <FaSmileWink />
      </Icon>
      <Title size="lg" color="secondary">
        검색 결과가 없습니다.
      </Title>

      <Link to="/books">전체 검색 결과로 이동</Link>
    </BookEmptyStyle>
  );
}

export default BookEmpty;

const BookEmptyStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 120px 0;
`;

const Icon = styled.div`
  svg {
    font-size: 4rem;
    fill: #ccc;
  }
`;
