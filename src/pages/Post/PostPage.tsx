import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Hero from "../../components/common/Hero/Hero";
import CommentItem from "../../components/features/CommentItem/CommentItem";
import Button from "../../components/common/Button/Button";
import { useAuth } from "../../context/AuthContext";
import { getPostById, addComment } from "../../api/posts";
import { Post } from "../../types";
import "./PostPage.scss";

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [commentName, setCommentName] = useState(user?.fullName || "");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (id) {
      getPostById(Number(id))
        .then((response) => setPost(response.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !user) return;

    try {
      await addComment(post.id, { name: commentName, text: commentText });
      const updated = await getPostById(post.id);
      setPost(updated.data);
      setCommentText("");
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (!post) return <div>Пост не найден</div>;

  return (
    <>
      <Hero title="Истории ваших путешествий" />
      <div className="post-page container">
        <div className="post-card-detailed">
          <div
            className="post-image"
            style={{
              backgroundImage: `url(${post.image || "/assets/images/Rectangle18.png"})`,
            }}
          />
          <h1 className="post-title">{post.title}</h1>
          <p className="post-content">{post.content}</p>
        </div>

        <section className="comments-section">
          <h2>Отзывы</h2>
          {post.comments?.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </section>

        <div className="post-actions">
          <Button variant="back" onClick={() => navigate(-1)}>
            Назад
          </Button>
          {user && (
            <Button
              variant="primary"
              className="add-comment-btn"
              onClick={() => setShowForm(!showForm)}
            >
              Ваше впечатление об этом месте
            </Button>
          )}
        </div>

        {showForm && user && (
          <form className="comment-form" onSubmit={handleAddComment}>
            <div className="form-field">
              <label>Ваше имя *</label>
              <input
                type="text"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                required
                maxLength={255}
              />
            </div>
            <div className="form-field">
              <label>Отзыв *</label>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                required
                maxLength={600}
                rows={4}
              />
              <div className="counter">{commentText.length}/600</div>
            </div>
            <Button variant="primary" type="submit">
              Сохранить
            </Button>
          </form>
        )}
      </div>
    </>
  );
};

export default PostPage;
