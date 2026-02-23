// Базовые константы
export const API_BASE_URL = "http://travelblog.skillbox.cc/api";

// Эндпоинты API
export const ENDPOINTS = {
  AUTH: {
    REGISTER: "/register",
    LOGIN: "/login",
    LOGOUT: "/logout",
  },
  USER: {
    PROFILE: "/user",
    PASSWORD: "/user/password",
  },
  POSTS: {
    BASE: "/posts",
    BY_ID: (id: number) => `/posts/${id}`,
    COMMENTS: (id: number) => `/posts/${id}/comments`,
  },
} as const;

// Количество постов на странице
export const POSTS_PER_PAGE = 6;

// Лимиты для валидации
export const VALIDATION = {
  POST_TITLE_MAX: 255,
  POST_DESCRIPTION_MAX: 2000,
  COMMENT_MAX: 600,
  USER_NAME_MAX: 255,
  CITY_MAX: 255,
  COUNTRY_MAX: 255,
} as const;

// Ключи для localStorage
export const STORAGE_KEYS = {
  TOKEN: "travel_blog_token",
  USER: "travel_blog_user",
} as const;