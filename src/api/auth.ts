import { mockUsers, updateMockUsers } from "./mockData";
import { User } from "../types";

interface AuthResponse {
  user: User;
  token: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const register = async (email: string, password: string) => {
  await delay(1000);

  console.log("Register attempt:", email);
  console.log("Current users:", mockUsers);

  // Проверяем, существует ли пользователь
  const existingUser = mockUsers.find((u) => u.email === email);
  if (existingUser) {
    console.log("User already exists");
    throw {
      response: {
        data: { message: "Пользователь с таким email уже существует" },
      },
    };
  }

  // Создаем нового пользователя
  const newUser: User = {
    id: mockUsers.length + 1,
    email,
    fullName: email.split("@")[0],
  };

  // Обновляем mockUsers
  const updatedUsers = [...mockUsers, newUser];
  updateMockUsers(updatedUsers);

  const response: AuthResponse = {
    user: newUser,
    token: "mock-token-" + Date.now(),
  };

  console.log("User registered:", newUser);
  return { data: response };
};

export const login = async (email: string, password: string) => {
  await delay(1000);

  console.log("Login attempt with email:", email);
  console.log("Current users in mockData:", mockUsers);

  // Ищем пользователя в актуальном списке
  const user = mockUsers.find((u) => u.email === email);

  if (!user) {
    console.log("User not found. Available users:", mockUsers);
    throw {
      response: {
        data: { message: "Неверный email или пароль" },
      },
    };
  }

  console.log("User found:", user);

  // В мок-данных не проверяем пароль для простоты
  const response: AuthResponse = {
    user,
    token: "mock-token-" + Date.now(),
  };

  return { data: response };
};

export const logout = async () => {
  await delay(500);
  return { data: { success: true } };
};

export const authApi = {
  register,
  login,
  logout,
};
