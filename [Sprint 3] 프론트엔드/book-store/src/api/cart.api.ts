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

export const fetchCart = async () => {
  try {
    const response = await httpClient.get(`/cart`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteCartItem = async (cartId: number) => {
  try {
    const response = await httpClient.delete(`/cart/${cartId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
