import api from "./config";
import { ENDPOINTS } from "../utils/constants";
import { Post, Comment } from "../types";
import { getMockPosts, getMockPostById, addMockComment } from "./mockData";

const isDemoMode = process.env.REACT_APP_DEMO_MODE === "true";

export const getPosts = async () => {
  if (isDemoMode) {
    const mock = getMockPosts();
    return { data: mock.data };
  }
  const response = await api.get<Post[]>(ENDPOINTS.POSTS.BASE);
  return response;
};

export const getPostById = async (id: number) => {
  if (isDemoMode) {
    return getMockPostById(id);
  }
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
  if (isDemoMode) {
    const post = getMockPostById(postId).data;
    return { data: post.comments || [] };
  }
  const response = await api.get<Comment[]>(ENDPOINTS.POSTS.COMMENTS(postId));
  return response;
};

export const addComment = async (postId: number, data: { full_name: string; comment: string }) => {
  if (isDemoMode) {
    return addMockComment(postId, data);
  }
  const response = await api.post<Comment>(ENDPOINTS.POSTS.COMMENTS(postId), data);
  return response;
};
