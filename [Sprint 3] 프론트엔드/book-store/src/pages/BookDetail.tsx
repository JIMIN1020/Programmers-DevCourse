import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useBook } from "../hooks/useBook";
import { getImgSrc } from "../utils/image";
import Title from "../components/common/Title";
import { BookDetail as IBookDetail } from "../models/book.model";
import { formatDate, formatNumber } from "../utils/format";
import EllipsisBox from "../components/common/EllipsisBox";
import LikeButton from "../components/book/LikeButton";
import AddToCart from "../components/book/AddToCart";

const bookInfoList = [
  {
    label: "카테고리",
    key: "category_name",
    filter: (book: IBookDetail) => (
      <Link to={`/books?categoryId=${book.category_id}`}>
        {book.category_name}
      </Link>
    ),
  },
  {
    label: "포맷",
    key: "format",
  },
  {
    label: "페이지",
    key: "pages",
  },
  {
    label: "ISBN",
    key: "isbn",
  },
  {
    label: "출간일",
    key: "published_date",
    filter: (book: IBookDetail) => {
      return formatDate(book.published_date);
    },
  },
  {
    label: "가격",
    key: "price",
    filter: (book: IBookDetail) => {
      return `${formatNumber(book.price)}원`;
    },
  },
];

function BookDetail() {
  const { bookId } = useParams();
  const { book, likeToggle } = useBook(bookId);

  if (!book) return null;

  return (
    <BookDetailStyle>
      <Header>
        <div className="img">
          <img src={getImgSrc(book.img)} alt="book img" />
        </div>
        <Info>
          <Title size="lg" color="text">
            {book.title}
          </Title>
          <InfoLine>
            {bookInfoList.map((item) => (
              <dl key={item.key}>
                <dt>{item.label}</dt>
                <dd>
                  {item.filter
                    ? item.filter(book)
                    : book[item.key as keyof IBookDetail]}
                </dd>
              </dl>
            ))}
          </InfoLine>
          <Summary>{book.summary}</Summary>

          <div>
            <LikeButton book={book} onClick={likeToggle} />
          </div>

          <AddToCart book={book} />
        </Info>
      </Header>
      <Content>
        <div>
          <Title size="md">상세 설명</Title>
          <EllipsisBox lineLimit={4}>{book.detail}</EllipsisBox>
        </div>

        <div>
          <Title size="md">목차</Title>
          <p>{book.contents}</p>
        </div>
      </Content>
    </BookDetailStyle>
  );
}

export default BookDetail;

const BookDetailStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: start;
  gap: 24px;

  .img {
    flex: 1;
    img {
      width: 100%;
      height: auto;
    }
  }
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InfoLine = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  dl {
    display: flex;
    margin: 0;
    dt {
      width: 80px;
      color: ${({ theme }) => theme.color.secondary};
    }
    a {
      color: ${({ theme }) => theme.color.primary};
    }
  }
`;

const Summary = styled.p`
  //
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  div {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;
