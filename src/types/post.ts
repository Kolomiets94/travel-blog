import { User } from './user';

export interface Post {
  id: number;
  title: string;
  description: string;
  excerpt?: string;
  country: string;
  city: string;
  photo: string;
  userInfo: {
    full_name: string;
    city?: string;
    country?: string;
    bio?: string;
  };
  created_at?: string;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  post_id?: number;
  author_name: string;
  comment: string;
  created_at: string;
}

export interface LoginResponse {
  token: string;
}