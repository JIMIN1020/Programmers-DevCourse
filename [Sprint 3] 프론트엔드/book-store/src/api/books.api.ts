import { httpClient } from "./http";

interface FetchBooksParams {
  categoryId?: number;
  newly?: boolean;
  page?: number;
  limit?: number;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const response = await httpClient.get(`/book`, {
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
