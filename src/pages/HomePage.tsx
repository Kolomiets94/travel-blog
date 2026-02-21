import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/common/Hero/Hero";
import PostCard from "../components/features/PostCard/PostCard";
import Button from "../components/common/Button/Button";
import { useAuth } from "../context/AuthContext";
import { getPosts } from "../api/posts";
import { Post } from "../types";
import "./HomePage.scss";

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => console.error("Error loading posts:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <Hero title="Там, где мир начинается с путешествий" height={422} />
        <div className="home-page">
          <div className="loading">Загрузка...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Hero title="Там, где мир начинается с путешествий" height={422} />
      <div className="home-page">
        <div className="posts-grid">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onReadMore={(id) => navigate(`/posts/${id}`)}
              />
            ))
          ) : (
            <p className="no-posts">
              Пока нет постов. Будьте первым, кто добавит историю!
            </p>
          )}
        </div>

        {user && (
          <div className="add-post-wrapper">
            <Button
              variant="primary"
              className="add-post-btn"
              onClick={() => navigate("/create-post")}
            >
              Добавить мое путешествие
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
