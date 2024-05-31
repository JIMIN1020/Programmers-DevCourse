import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Book } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constants/queryString";
import { LIMIT } from "../constants/pagination";

export const useBooks = () => {
  const location = useLocation();
  const [books, setBooks] = useState<Book[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalCount: 0,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    console.log(params.get(QUERYSTRING.CATEGORY_ID));

    fetchBooks({
      categoryId: params.get(QUERYSTRING.CATEGORY_ID)
        ? +params.get(QUERYSTRING.CATEGORY_ID)!
        : undefined,
      newly: params.get(QUERYSTRING.NEWLY) ? true : undefined,
      page: params.get(QUERYSTRING.PAGE) ? +params.get(QUERYSTRING.PAGE)! : 1,
      limit: LIMIT,
    }).then(({ result: { books, pagination } }) => {
      setBooks(books);
      setPagination(pagination);
      setIsEmpty(books.length === 0);
    });
  }, [location.search]);

  return { books, pagination, isEmpty };
};
