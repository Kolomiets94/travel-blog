# TravelBlog 🌍

A responsive travel community SPA built with **React 18** and **TypeScript**. Users can browse travel stories, create their own posts, leave comments, authenticate, and manage their profile.

## ✨ Features

- User registration, login, and logout
- Token-based authentication
- Protected routes for authenticated users
- Travel posts feed and detailed post pages
- Create a post with an uploaded image
- Add comments to travel posts
- Edit profile information and upload an avatar
- Change account password
- Responsive SCSS interface
- Loading and error states for user actions

## 🛠 Tech Stack

- **React 18**
- **TypeScript**
- **React Router**
- **Axios**
- **Context API**
- **React Hook Form**
- **Yup**
- **SCSS**
- **REST API**

## 🔎 Technical Highlights

### Authentication and protected routes
Authentication state is managed through a dedicated `AuthContext`. Private pages such as profile management and post creation are protected with a reusable `ProtectedRoute` component.

### API layer
API requests are separated into dedicated modules for authentication, posts, and user data. A shared Axios instance automatically attaches the authentication token to requests.

The response interceptor handles unauthorized (`401`) responses by clearing stored authentication data and redirecting the user to the login page.

### Typed API interaction
Post, comment, and user data are represented with TypeScript types. API functions use typed Axios responses to keep data handling explicit.

### File uploads
New travel posts are submitted using `FormData`, including an uploaded JPEG/PNG image. Profile editing also supports avatar uploads with a local preview.

### Reusable UI
The application contains reusable UI components including buttons, form fields, the header, hero section, success modal, and protected-route wrapper.

## 📁 Project Structure

```text
src/
├── api/          # Axios configuration and API modules
├── components/   # Reusable and feature components
├── context/      # Authentication context
├── pages/        # Application pages
├── types/        # TypeScript types
├── utils/        # Constants and shared configuration
├── App.tsx       # Routing
└── App.scss
```

## 🚀 Run Locally

### Requirements

- Node.js
- npm

### Installation

```bash
git clone https://github.com/Kolomiets94/travel-blog.git
cd travel-blog
npm install
npm start
```

The development server starts at `http://localhost:3000`.

> **API note:** the current project is configured to use the TravelBlog API at `http://travelblog.skillbox.cc/api`. API availability is required for authentication and server-backed features.

## 🔌 Main API Operations

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/register` | Register a user |
| POST | `/login` | Authenticate a user |
| GET | `/logout` | Log out |
| GET | `/user` | Load the current profile |
| POST | `/user` | Update profile data |
| PATCH | `/user/password` | Change password |
| GET | `/posts` | Load travel posts |
| POST | `/posts` | Create a travel post |
| GET | `/posts/:id` | Load a single post |
| POST | `/posts/:id/comments` | Add a comment |

## 👨‍💻 Author

**Alexander Kolomiets** — Junior Frontend Developer

- GitHub: [Kolomiets94](https://github.com/Kolomiets94)
- Email: Kolomiets94@yandex.ru
- Telegram: @Kolomiets94
