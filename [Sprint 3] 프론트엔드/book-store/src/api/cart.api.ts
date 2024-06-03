import { httpClient } from "./http";

interface AddCartParams {
  bookId: number;
  quantity: number;
}

export const addCart = async (params: AddCartParams) => {
  try {
    const response = await httpClient.post(`/cart`, params);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
