import { useLocation } from "react-router-dom";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constants/queryString";
import { LIMIT } from "../constants/pagination";
import { useInfiniteQuery } from "react-query";

export const useBooksInfinite = () => {
  const location = useLocation();

  const getBooks = ({ pageParam }: { pageParam: number }) => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get(QUERYSTRING.CATEGORY_ID)
      ? +params.get(QUERYSTRING.CATEGORY_ID)!
      : undefined;
    const newly = params.get(QUERYSTRING.NEWLY) ? true : undefined;
    const limit = LIMIT;
    const page = pageParam;

    return fetchBooks({ categoryId, newly, page, limit });
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    ["books", location.search],
    ({ pageParam = 1 }) => getBooks({ pageParam }),
    {
      getNextPageParam: (lastPage) => {
        console.log("last", lastPage);
        const isLastPage =
          Math.ceil(lastPage.result.pagination.total_count / LIMIT) ===
          lastPage.result.pagination.current_page;
        return isLastPage ? null : lastPage.result.pagination.current_page + 1;
      },
    }
  );

  const books = data ? data.pages.flatMap((page) => page.result.books) : [];
  const pagination = data
    ? data.pages[data.pages.length - 1].result.pagination
    : {};
  const isEmpty = books.length === 0;

  return {
    books,
    pagination,
    isEmpty,
    isBooksLoading: isFetching,
    fetchNextPage,
    hasNextPage,
  };
};
