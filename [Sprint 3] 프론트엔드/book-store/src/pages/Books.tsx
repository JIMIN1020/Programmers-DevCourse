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
  const { books, isEmpty } = useBooks();
  return (
    <>
      <Title size="lg">도서 검색 결과</Title>
      <BooksStyle>
        <BookFilter />
        <BookViewSwitcher />
        {isEmpty ? <BookEmpty /> : <BookList books={books} />}
        <Pagination />
      </BooksStyle>
    </>
  );
}

export default Books;

const BooksStyle = styled.div`
  //
`;
