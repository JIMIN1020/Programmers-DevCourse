import axios, { AxiosRequestConfig } from "axios";
import { getToken, removeToken } from "../store/authStore";

const BASE_URL = "http://localhost:9999";
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken() ? getToken() : undefined,
    },
    ...config,
  });

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      // 로그인 만료 처리
      if (err.response.status === 401) {
        removeToken();
        window.location.href = "/login";
        return;
      }
      return Promise.reject(err);
    }
  );

  return axiosInstance;
};

export const httpClient = createClient();

// 공통 요청 부분
type requestMethod = "get" | "post" | "put" | "delete";

export const requestHandler = async <T>(
  method: requestMethod,
  url: string,
  payload?: T
) => {
  let response;

  switch (method) {
    case "post":
      response = await httpClient.post(url, payload);
      break;
    case "get":
      response = await httpClient.get(url);
      break;
    case "put":
      response = await httpClient.put(url, payload);
      break;
    case "delete":
      response = await httpClient.delete(url);
      break;
  }

  return response.data;
};
