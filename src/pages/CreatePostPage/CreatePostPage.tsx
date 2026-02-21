// src/pages/CreatePostPage/CreatePostPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../../components/common/Hero/Hero";
import FormField from "../../components/common/FormField/FormField";
import Button from "../../components/common/Button/Button";
import { createPost } from "../../api/posts";
import "./CreatePostPage.scss";

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      setError("Пожалуйста, загрузите изображение");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", description);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("image", image);

    try {
      setLoading(true);
      setError("");
      const response = await createPost(formData);
      navigate(`/posts/${response.data.id}`);
    } catch (err) {
      setError("Ошибка при создании поста");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Hero title="Истории ваших путешествий" />
      <div className="create-post-page container">
        <div className="form-container">
          <h1 className="form-title">Добавление истории о путешествии</h1>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="upload-field">
              <label htmlFor="image-upload" className="upload-btn">
                <span>Загрузите ваше фото</span>
              </label>
              <input
                type="file"
                id="image-upload"
                accept="image/jpeg,image/png"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                style={{ display: "none" }}
              />
              {image && <div className="file-name">{image.name}</div>}
            </div>

            <FormField label="Заголовок" required>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Напишите заголовок"
                maxLength={255}
                required
              />
            </FormField>

            <div className="row">
              <FormField label="Страна" required>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Напишите название страны"
                  maxLength={255}
                  required
                />
              </FormField>
              <FormField label="Город" required>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Напишите название города"
                  maxLength={255}
                  required
                />
              </FormField>
            </div>

            <FormField
              label="Описание"
              required
              counter={`${description.length}/2000`}
            >
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Добавьте описание вашей истории"
                maxLength={2000}
                rows={5}
                required
              />
            </FormField>

            <div className="form-actions">
              <Button variant="back" onClick={() => navigate(-1)} type="button">
                Назад
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Сохранение..." : "Сохранить"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePostPage;
