import { mockPosts, mockUsers } from "./mockData"; // Добавлен импорт mockUsers
import { Post } from "../types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getPosts = async () => {
  await delay(800);
  console.log("Posts loaded:", mockPosts.length);
  return { data: mockPosts };
};

export const getPostById = async (id: number) => {
  await delay(500);
  const post = mockPosts.find((p) => p.id === id);
  if (!post) {
    throw new Error("Post not found");
  }
  return { data: post };
};

export const createPost = async (formData: FormData) => {
  await delay(1500);

  const newPost: Post = {
    id: mockPosts.length + 1,
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    country: formData.get("country") as string,
    city: formData.get("city") as string,
    image: "/assets/images/Rectangle%2017.png",
    author: mockUsers[0], // теперь mockUsers доступен
    createdAt: new Date().toISOString(),
    comments: [],
  };

  mockPosts.unshift(newPost);
  return { data: newPost };
};

export const addComment = async (
  postId: number,
  data: { name: string; text: string },
) => {
  await delay(800);

  const post = mockPosts.find((p) => p.id === postId);
  if (!post) {
    throw new Error("Post not found");
  }

  const newComment = {
    id: (post.comments?.length || 0) + 1,
    text: data.text,
    author: {
      id: mockUsers.length + 1, // теперь mockUsers доступен
      email: "user@example.com",
      fullName: data.name,
    },
    createdAt: new Date().toISOString(),
  };

  if (!post.comments) {
    post.comments = [];
  }
  post.comments.push(newComment);

  return { data: newComment };
};
