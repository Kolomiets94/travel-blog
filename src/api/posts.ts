import api from "./config";
import { ENDPOINTS } from "../utils/constants";
import { Post, Comment } from "../types";

export const getPosts = async () => {
  const response = await api.get<Post[]>(ENDPOINTS.POSTS.BASE);
  return response;
};

export const getPostById = async (id: number) => {
  const response = await api.get<Post>(ENDPOINTS.POSTS.BY_ID(id));
  return response;
};

export const createPost = async (formData: FormData) => {
  const response = await api.post<Post>(ENDPOINTS.POSTS.BASE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

export const getComments = async (postId: number) => {
  const response = await api.get<Comment[]>(ENDPOINTS.POSTS.COMMENTS(postId));
  return response;
};

export const addComment = async (postId: number, data: { full_name: string; comment: string }) => {
  const response = await api.post<Comment>(ENDPOINTS.POSTS.COMMENTS(postId), data);
  return response;
};