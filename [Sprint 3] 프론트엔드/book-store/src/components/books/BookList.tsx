import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BookItem from "./BookItem";
import { Book } from "../../models/book.model";
import { useLocation } from "react-router-dom";
import { QUERYSTRING } from "../../constants/queryString";

interface Props {
  books: Book[];
}

function BookList({ books }: Props) {
  const [view, setView] = useState<string>("grid");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get(QUERYSTRING.VIEW)) {
      setView(params.get(QUERYSTRING.VIEW)!);
    }
  }, [location.search]);

  return (
    <BookListStyle view={view}>
      {books.map((item) => (
        <BookItem key={item.id} bookData={item} view={view} />
      ))}
    </BookListStyle>
  );
}

export default BookList;

const BookListStyle = styled.div<{ view: string }>`
  display: grid;
  grid-template-columns: ${({ view }) =>
    view === "grid" ? "repeat(4, 1fr)" : "repeat(1, 1fr)"};
  gap: 24px;
`;
