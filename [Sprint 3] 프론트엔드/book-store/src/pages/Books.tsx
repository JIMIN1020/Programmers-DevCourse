import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Title from "../components/common/Title";
import BookFilter from "../components/books/BookFilter";
import BookList from "../components/books/BookList";
import { FaSmileWink } from "react-icons/fa";
import BookViewSwitcher from "../components/books/BookViewSwitcher";
import Empty from "../components/common/Empty";
import { Link } from "react-router-dom";
import { useBooksInfinite } from "@/hooks/useBooksInfinite";
import Button from "@/components/common/Button";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

function Books() {
  const { books, isEmpty, isBooksLoading, fetchNextPage, hasNextPage } =
    useBooksInfinite();

  const moreRef = useIntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      loadMore();
    }
  }, {});

  const loadMore = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  if (isEmpty)
    return (
      <Empty
        icon={<FaSmileWink />}
        title="검색 결과가 없습니다."
        description={<Link to="/books">전체 검색 결과로 이동</Link>}
      />
    );

  if (isBooksLoading) return <div>loading...</div>;

  return (
    <>
      <Title size="lg">도서 검색 결과</Title>
      <BooksStyle>
        <Wrapper>
          <BookFilter />
          <BookViewSwitcher />
        </Wrapper>
        {books && <BookList books={books} />}
        {/* {pagination && <Pagination pagination={pagination} />} */}
        <div className="more" ref={moreRef}>
          <Button
            size="md"
            scheme="normal"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage}
          >
            {hasNextPage ? "더보기" : "마지막 페이지"}
          </Button>
        </div>
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
