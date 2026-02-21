import { User } from "./user";

export interface Post {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  country: string;
  city: string;
  image?: string;
  author: User;
  createdAt: string;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  text: string;
  author: User;
  createdAt: string;
}
