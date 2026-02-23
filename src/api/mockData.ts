import { Post, Comment, User } from '../types';

export const mockUsers: User[] = [
  {
    id: 1,
    full_name: 'Тестовый Пользователь',
    email: 'test@example.com',
    city: 'Москва',
    country: 'Россия',
    bio: 'Путешественник со стажем',
    photo: '/assets/images/Ellipse 1.png'
  },
  {
    id: 2,
    full_name: 'Анна Петрова',
    email: 'anna@example.com',
    city: 'Санкт-Петербург',
    country: 'Россия',
    bio: 'Фотограф и блогер',
    photo: '/assets/images/Ellipse 1.png'
  },
  {
    id: 3,
    full_name: 'Александр Коломиец',
    email: 'Kolomiets94@yandex.ru',
    city: 'Москва',
    country: 'Россия',
    bio: 'Люблю путешествовать',
    photo: '/assets/images/Ellipse 1.png'
  }
];

const getISODate = (daysAgo: number = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

export const mockPosts: Post[] = [
  {
    id: 1,
    title: 'Один зимний день в Венеции',
    description: 'Говорят, что Венецию покинуло 70% местных жителей. Говорят, что это из-за сверх туризма. Еще говорят, что Венеция уходит под воду. Но даже несмотря на все эти разговоры, город продолжает очаровывать миллионы туристов своей уникальной атмосферой, каналами и архитектурой.',
    excerpt: 'Говорят, что Венецию покинуло 70% местных жителей...',
    country: 'Италия',
    city: 'Венеция',
    photo: '/assets/images/Rectangle 17.png',
    userInfo: mockUsers[0],
    created_at: getISODate(15),
    comments: [
      {
        id: 1,
        author_name: 'Анна Петрова',
        comment: 'Прекрасное место! Обязательно вернусь сюда еще раз. Атмосфера невероятная, особенно в межсезонье.',
        created_at: getISODate(14)
      },
      {
        id: 2,
        author_name: 'Александр Коломиец',
        comment: 'Спасибо за пост! Очень живо описали. А где именно останавливались?',
        created_at: getISODate(13)
      }
    ]
  },
  {
    id: 2,
    title: 'Фуншал. Расслабленный и броский',
    description: 'Обзорно о замках Фуншала, музеях, скульптурах и нарядных улицах центра. Столица Мадейры удивляет своей атмосферой, где современность переплетается с историей. Узкие улочки старого города, красочные дома и потрясающие виды на океан создают неповторимый колорит.',
    excerpt: 'Обзорно о замках Фуншала, музеях, скульптурах...',
    country: 'Португалия',
    city: 'Фуншал',
    photo: '/assets/images/Rectangle 18.png',
    userInfo: mockUsers[1],
    created_at: getISODate(25),
    comments: []
  },
  {
    id: 3,
    title: 'Два сезона Северной Осетии. ч. 1 — Зима',
    description: 'Моя первая вылазка в Северную Осетию, январь совсем не популярный месяц тут, но с погодой очень повезло. Виды были потрясающие - заснеженные горы, чистейший воздух, гостеприимные люди. Особенно запомнился Куртатинское ущелье и средневековые башни.',
    excerpt: 'Моя первая вылазка в Северную Осетию...',
    country: 'Россия',
    city: 'Владикавказ',
    photo: '/assets/images/Rectangle 23.png',
    userInfo: mockUsers[2],
    created_at: getISODate(35),
    comments: []
  }
];

export const getMockPosts = (page = 1, limit = 6) => {
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedPosts = mockPosts.slice(start, end);
  
  return {
    data: paginatedPosts,
    meta: {
      current_page: page,
      last_page: Math.ceil(mockPosts.length / limit),
      total: mockPosts.length
    }
  };
};

export const getMockPostById = (id: number) => {
  const post = mockPosts.find(p => p.id === id);
  if (!post) {
    throw new Error('Post not found');
  }
  return { data: post };
};

export const addMockComment = (postId: number, data: { full_name: string; comment: string }) => {
  const post = mockPosts.find(p => p.id === postId);
  if (!post) {
    throw new Error('Post not found');
  }

  const newComment = {
    id: (post.comments?.length || 0) + 1,
    author_name: data.full_name,
    comment: data.comment,
    created_at: new Date().toISOString()
  };

  if (!post.comments) {
    post.comments = [];
  }
  post.comments.push(newComment);

  return { data: newComment };
};