import React from "react";
import { Book } from "../../models/book.model";
import styled from "styled-components";
import { getImgSrc } from "../../utils/image";
import { formatNumber } from "../../utils/format";
import { FaHeart } from "react-icons/fa";

interface Props {
  bookData: Book;
}

function BookItem({ bookData }: Props) {
  return (
    <BookItemStyle>
      <BookImg>
        <img src={getImgSrc(bookData.id)} alt={bookData.title} />
      </BookImg>
      <Content>
        <h2>{bookData.title}</h2>
        <p className="summary">{bookData.summary}</p>
        <p className="author">{bookData.author}</p>
        <p className="price">{formatNumber(bookData.price)}원</p>
        <Likes>
          <FaHeart />
          {bookData.likes}
        </Likes>
      </Content>
    </BookItemStyle>
  );
}

export default BookItem;

const BookItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

const BookImg = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.default};
  overflow: hidden;

  img {
    max-width: 100%;
  }
`;

const Content = styled.div`
  padding: 16px;
  position: relative;

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 12px 0;
  }
  .summary {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.color.secondary};
    margin: 0 0 4px 0;
  }
  .author {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.color.secondary};
    margin: 0 0 4px 0;
  }
  .summary {
    font-size: 1rem;
    color: ${({ theme }) => theme.color.secondary};
    margin: 0 0 4px 0;
    font-weight: 700;
  }
`;

const Likes = styled.button`
  background: 0;
  border: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.color.primary};
  margin: 0 0 4px 0;
  font-weight: 700;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: 4px 12px;

  position: absolute;
  bottom: 16px;
  right: 16px;

  svg {
    color: ${({ theme }) => theme.color.primary};
  }
`;
