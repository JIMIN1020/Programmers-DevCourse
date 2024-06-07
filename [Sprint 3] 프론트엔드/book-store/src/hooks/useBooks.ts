import { useLocation } from "react-router-dom";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constants/queryString";
import { LIMIT } from "../constants/pagination";
import { useQuery } from "react-query";

export const useBooks = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const { data, isLoading: isBooksLoading } = useQuery(
    ["books", location.search],
    () =>
      fetchBooks({
        categoryId: params.get(QUERYSTRING.CATEGORY_ID)
          ? +params.get(QUERYSTRING.CATEGORY_ID)!
          : undefined,
        newly: params.get(QUERYSTRING.NEWLY) ? true : undefined,
        page: params.get(QUERYSTRING.PAGE) ? +params.get(QUERYSTRING.PAGE)! : 1,
        limit: LIMIT,
      })
  );

  return {
    books: data?.result?.books ?? [],
    pagination: data?.result?.pagination ?? { totalCount: 0, currentPage: 1 },
    isEmpty: (data?.result?.books ?? []).length === 0,
    isBooksLoading,
  };
};
