import api from "./config";
import { ENDPOINTS } from "../utils/constants";

export const login = async (email: string, password: string) => {
  const response = await api.post<{ token: string }>(ENDPOINTS.AUTH.LOGIN, { email, password });
  
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  
  return response;
};

export const register = async (email: string, password: string) => {
  const response = await api.post<{ token: string }>(ENDPOINTS.AUTH.REGISTER, { email, password });
  
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  
  return response;
};

export const logout = async () => {
  const response = await api.get(ENDPOINTS.AUTH.LOGOUT);
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return response;
};

export const authApi = {
  login,
  register,
  logout,
};