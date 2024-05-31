import React from "react";
import styled from "styled-components";
import BookItem from "./BookItem";
import { Book } from "../../models/book.model";

interface Props {
  books: Book[];
}

function BookList({ books }: Props) {
  return (
    <BookListStyle>
      {books.map((item) => (
        <BookItem key={item.id} bookData={item} />
      ))}
    </BookListStyle>
  );
}

export default BookList;

const BookListStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
`;
