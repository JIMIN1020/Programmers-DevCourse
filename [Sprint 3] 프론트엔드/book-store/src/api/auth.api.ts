import { SignUpProps } from "../pages/Signup";
import { httpClient } from "./http";

export const signup = async (userData: SignUpProps) => {
  const response = await httpClient.post("/user/join", userData);
  return response.data;
};

export const resetRequest = async (data: SignUpProps) => {
  const response = await httpClient.post("/user/reset", data);
  return response.data;
};

export const resetPassword = async (data: SignUpProps) => {
  const response = await httpClient.put("/user/reset", data);
  return response.data;
};

export const login = async (data: SignUpProps) => {
  const response = await httpClient.post("/user/login", data);
  return response.data;
};
