import { httpClient } from "./http";

interface FetchBooksParams {
  cateogry_id?: number;
  isNew?: boolean;
  currentPage?: number;
  limit?: number;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const response = await httpClient.get(`/books`, {
      params: params,
    });

    return response.data;
  } catch (err) {
    return {
      isSuccess: false,
      result: {
        books: [],
        pagination: {
          totalCount: 0,
          currentPage: 1,
        },
      },
    };
  }
};
