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

export const fetchBook = async (bookId: string) => {
  try {
    const response = await httpClient.get(`/book/${bookId}`);
    return response.data.result;
  } catch (err) {
    return {
      isSuccess: false,
      result: {},
    };
  }
};

export const likeBook = async (bookId: number) => {
  try {
    const response = await httpClient.post(`/like/${bookId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const cancelLikeBook = async (bookId: number) => {
  try {
    const response = await httpClient.delete(`/like/${bookId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
