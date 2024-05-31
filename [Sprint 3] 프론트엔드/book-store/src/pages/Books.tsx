import React from "react";
import styled from "styled-components";
import Title from "../components/common/Title";
import BookFilter from "../components/books/BookFilter";
import BookList from "../components/books/BookList";
import BookEmpty from "../components/books/BookEmpty";
import Pagination from "../components/books/Pagination";
import BookViewSwitcher from "../components/books/BookViewSwitcher";
import { useBooks } from "../hooks/useBooks";

function Books() {
  const { books, isEmpty, pagination } = useBooks();
  return (
    <>
      <Title size="lg">도서 검색 결과</Title>
      <BooksStyle>
        <Wrapper>
          <BookFilter />
          <BookViewSwitcher />
        </Wrapper>
        {isEmpty ? <BookEmpty /> : <BookList books={books} />}
        <Pagination pagination={pagination} />
      </BooksStyle>
    </>
  );
}

export default Books;

const BooksStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  align-items: center;
`;
