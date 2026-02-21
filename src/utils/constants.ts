export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3001/api";

export const STORAGE_KEYS = {
  TOKEN: "travel_blog_token",
  USER: "travel_blog_user",
};

export const VALIDATION = {
  POST_TITLE_MAX: 255,
  POST_CONTENT_MAX: 2000,
  COMMENT_TEXT_MAX: 600,
  USER_NAME_MAX: 255,
  CITY_MAX: 255,
  COUNTRY_MAX: 255,
};
