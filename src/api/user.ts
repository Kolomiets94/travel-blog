import { mockUsers, updateMockUsers } from "./mockData";
import { User } from "../types";

export type UserProfile = User;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getUser = async () => {
  await delay(500);
  // Возвращаем текущего пользователя (первого в списке)
  // В реальном проекте здесь должен быть запрос к API
  return { data: mockUsers[0] };
};

export const updateUser = async (data: FormData) => {
  await delay(1000);

  const fullName = data.get("fullName") as string;
  const city = data.get("city") as string;
  const bio = data.get("bio") as string;
  const avatar = data.get("avatar") as File;

  // Находим текущего пользователя (предполагаем, что это первый)
  const currentUser = mockUsers[0];

  const updatedUser = {
    ...currentUser,
    fullName: fullName || currentUser.fullName,
    city: city || currentUser.city,
    bio: bio || currentUser.bio,
  };

  // Если есть новый аватар, здесь должна быть логика его сохранения
  // Для мок-данных просто используем существующий

  // Обновляем пользователя в массиве
  const updatedUsers = [updatedUser, ...mockUsers.slice(1)];
  updateMockUsers(updatedUsers);

  return { data: updatedUser };
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  await delay(800);
  return { data: { success: true } };
};

export const userApi = {
  getUser,
  updateUser,
  changePassword,
};
