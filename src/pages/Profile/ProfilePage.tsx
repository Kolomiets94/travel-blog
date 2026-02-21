import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../../components/common/Hero/Hero";
import FormField from "../../components/common/FormField/FormField";
import Button from "../../components/common/Button/Button";
import SuccessModal from "../../components/common/SuccessModal/SuccessModal";
import { useAuth } from "../../context/AuthContext";
import { updateUser, changePassword } from "../../api/user";
import "./ProfilePage.scss";

const ProfilePage: React.FC = () => {
  const { user, logout, updateUserData } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Данные профиля
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  // Данные пароля
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setCity(user.city || "");
      setBio(user.bio || "");
      setAvatarPreview(user.avatar || "/assets/images/Ellipse1.png");
    }
  }, [user]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setError("ФИО обязательно для заполнения");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("city", city);
    formData.append("bio", bio);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      setLoading(true);
      setError("");
      await updateUser(formData);
      await updateUserData();
      setIsEditing(false);
      setSuccessMessage("Профиль успешно обновлён!");
      setShowSuccessModal(true);
    } catch (err) {
      setError("Ошибка при сохранении профиля");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordError("Пароли не совпадают");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("Пароль должен быть не менее 6 символов");
      return;
    }

    try {
      setLoading(true);
      setPasswordError("");
      await changePassword({
        currentPassword: "",
        newPassword,
      });
      setNewPassword("");
      setConfirmPassword("");
      setChangingPassword(false);
      setSuccessMessage("Пароль успешно изменён!");
      setShowSuccessModal(true);
    } catch (err) {
      setPasswordError("Ошибка при смене пароля");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (!user) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <>
      <Hero title="Истории ваших путешествий" />
      <div className="profile-page container">
        <div className="profile-sidebar">
          <div className="avatar-large">
            <img
              src={avatarPreview}
              alt="avatar"
              onError={(e) => {
                e.currentTarget.src = "/assets/images/Ellipse1.png";
              }}
            />
          </div>

          {isEditing && (
            <div className="change-photo-wrapper">
              <label htmlFor="avatar-upload" className="change-photo-btn">
                <img
                  src="/assets/images/material-symbols-light_photo-camera-outlinephotoapparat.png"
                  alt="camera"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span>Изменить фото</span>
              </label>
              <input
                type="file"
                id="avatar-upload"
                accept="image/jpeg,image/png"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
            </div>
          )}
        </div>

        <div className="profile-main">
          {!isEditing ? (
            // Режим просмотра
            <>
              <div className="profile-header">
                <h1 className="profile-name">{fullName || "Имя не указано"}</h1>
                <button
                  className="edit-btn"
                  onClick={() => setIsEditing(true)}
                  title="Редактировать профиль"
                >
                  <img
                    src="/assets/images/carbon_edit.svg"
                    alt="edit"
                    className="edit-icon"
                  />
                </button>
              </div>

              <div className="profile-info">
                <div className="info-item">
                  <span className="info-label">Город:</span>
                  <span className="info-value">{city || "Не указан"}</span>
                </div>
              </div>

              <div className="profile-bio">
                <span className="bio-label">О себе:</span>
                <p className="bio-text">
                  {bio || "Пока ничего не рассказано..."}
                </p>
              </div>

              <div className="profile-actions">
                <Button variant="back" onClick={() => navigate(-1)}>
                  Назад
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  Выйти
                </Button>
              </div>
            </>
          ) : (
            // Режим редактирования
            <div className="profile-edit">
              {error && <div className="error-message">{error}</div>}

              <form onSubmit={handleSaveProfile} className="profile-edit-form">
                <h2 className="form-section-title">Редактирование профиля</h2>

                <FormField label="ФИО" required error={error}>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Введите ваше ФИО"
                    maxLength={255}
                    required
                    disabled={loading}
                  />
                </FormField>

                <FormField label="Город">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Введите ваш город"
                    maxLength={255}
                    disabled={loading}
                  />
                </FormField>

                <FormField label="О себе">
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Расскажите о себе"
                    rows={5}
                    maxLength={1000}
                    disabled={loading}
                  />
                </FormField>

                <div className="form-actions">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    type="button"
                    disabled={loading}
                  >
                    Отмена
                  </Button>
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? "Сохранение..." : "Сохранить изменения"}
                  </Button>
                </div>
              </form>

              <div className="password-section">
                <h2 className="form-section-title">Смена пароля</h2>

                {!changingPassword ? (
                  <Button
                    variant="outline"
                    onClick={() => setChangingPassword(true)}
                  >
                    Сменить пароль
                  </Button>
                ) : (
                  <form
                    onSubmit={handleChangePassword}
                    className="password-change-form"
                  >
                    {passwordError && (
                      <div className="error-message">{passwordError}</div>
                    )}

                    <FormField label="Новый пароль" required>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Введите новый пароль"
                        minLength={6}
                        required
                        disabled={loading}
                      />
                    </FormField>

                    <FormField label="Повторите пароль" required>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Повторите новый пароль"
                        minLength={6}
                        required
                        disabled={loading}
                      />
                    </FormField>

                    <div className="form-actions">
                      <Button
                        variant="outline"
                        onClick={() => setChangingPassword(false)}
                        type="button"
                        disabled={loading}
                      >
                        Отмена
                      </Button>
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Смена..." : "Сменить пароль"}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showSuccessModal && (
        <SuccessModal
          message={successMessage}
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </>
  );
};

export default ProfilePage;
