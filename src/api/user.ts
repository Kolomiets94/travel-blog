import api from "./config";
import { ENDPOINTS } from "../utils/constants";
import { User } from "../types";

export const getUser = async () => {
  const response = await api.get<User>(ENDPOINTS.USER.PROFILE);
  return response;
};

export const updateUser = async (data: FormData) => {
  const response = await api.post<User>(ENDPOINTS.USER.PROFILE, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

export const changePassword = async (password: string) => {
  const response = await api.patch(ENDPOINTS.USER.PASSWORD, { password });
  return response;
};

export const userApi = {
  getUser,
  updateUser,
  changePassword,
};