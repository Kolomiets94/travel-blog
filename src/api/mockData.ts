import { Post, User } from "../types";

const initialUsers: User[] = [
  {
    id: 1,
    email: "test@test.com",
    fullName: "Тестовый Пользователь",
    city: "Москва",
    bio: "Тестовый пользователь для входа",
    avatar: "/assets/images/Ellipse1.png",
  },
  {
    id: 2,
    email: "Kolomiets94@yandex.ru",
    fullName: "Коломиец Александр",
    city: "Москва",
    bio: "Путешественник и фотограф",
    avatar: "/assets/images/Ellipse1.png",
  },
];

const loadUsers = (): User[] => {
  const savedUsers = localStorage.getItem("mockUsers");
  if (savedUsers) {
    try {
      return JSON.parse(savedUsers);
    } catch (e) {
      console.error("Failed to parse saved users", e);
    }
  }
  return [...initialUsers];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem("mockUsers", JSON.stringify(users));
};

export let mockUsers: User[] = loadUsers();

export const updateMockUsers = (newUsers: User[]) => {
  mockUsers = newUsers;
  saveUsers(newUsers);
};

export const mockPosts: Post[] = [
  {
    id: 1,
    title: "Один зимний день в Венеции",
    content:
      "Говорят, что Венецию покинуло 70% местных жителей. Говорят, что это из-за сверх туризма. Еще говорят, что Венеция уходит под воду.",
    excerpt: "Говорят, что Венецию покинуло 70% местных жителей...",
    country: "Италия",
    city: "Венеция",
    image: "/assets/images/Rectangle17.png",
    author: mockUsers[0],
    createdAt: new Date().toISOString(),
    comments: [],
  },
  {
    id: 2,
    title: "Фуншал. Расслабленный и броский",
    content:
      "Обзорно о замках Фуншала, музеях, скульптурах и нарядных улицах центра.",
    excerpt: "Обзорно о замках Фуншала, музеях, скульптурах...",
    country: "Португалия",
    city: "Фуншал",
    image: "/assets/images/Rectangle18.png",
    author: mockUsers[0],
    createdAt: new Date().toISOString(),
    comments: [],
  },
  {
    id: 3,
    title: "Два сезона Северной Осетии. ч. 1 — Зима",
    content:
      "Моя первая вылазка в Северную Осетию, январь совсем не популярный месяц тут.",
    excerpt: "Моя первая вылазка в Северную Осетию...",
    country: "Россия",
    city: "Владикавказ",
    image: "/assets/images/Rectangle23.png",
    author: mockUsers[0],
    createdAt: new Date().toISOString(),
    comments: [],
  },
  {
    id: 4,
    title: "Короткое воспоминание о Монополи",
    content: "За окном уже снег, минус четыре и рано темнеет…",
    excerpt: "За окном уже снег, минус четыре и рано темнеет…",
    country: "Италия",
    city: "Монополи",
    image: "/assets/images/Rectangle24.png",
    author: mockUsers[0],
    createdAt: new Date().toISOString(),
    comments: [],
  },
  {
    id: 5,
    title: "Санкт-Петербург. Дворец Коттедж",
    content:
      "Дворец Коттедж и парк Александрия располагаются к востоку от центрального петергофского ансамбля.",
    excerpt: "Дворец Коттедж и парк Александрия...",
    country: "Россия",
    city: "Санкт-Петербург",
    image: "/assets/images/Rectangle25.png",
    author: mockUsers[0],
    createdAt: new Date().toISOString(),
    comments: [],
  },
  {
    id: 6,
    title: "Арабская сказка: успеть за 8 часов",
    content: "Длинная стыковка на пути в Южную Америку: знакомство с Дохой.",
    excerpt: "Длинная стыковка на пути в Южную Америку...",
    country: "ОАЭ",
    city: "Дубай",
    image: "/assets/images/Rectangle17.png",
    author: mockUsers[0],
    createdAt: new Date().toISOString(),
    comments: [],
  },
];
