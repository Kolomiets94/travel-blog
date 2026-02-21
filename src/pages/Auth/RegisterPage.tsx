import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Hero from "../../components/common/Hero/Hero";
import FormField from "../../components/common/FormField/FormField";
import Button from "../../components/common/Button/Button";
import { useAuth } from "../../context/AuthContext";
import "./AuthPages.scss";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    try {
      await register(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка регистрации");
    }
  };

  return (
    <>
      <Hero title="Истории ваших путешествий" />
      <div className="auth-page container">
        <div className="auth-form">
          <h1 className="auth-title">Регистрация</h1>
          {error && <div className="auth-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <FormField label="Email" required>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите email"
                required
              />
            </FormField>
            <FormField label="Пароль" required>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                required
              />
            </FormField>
            <FormField label="Повторите пароль" required>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Повторите пароль"
                required
              />
            </FormField>
            <div className="auth-actions">
              <Link to="/login">
                <Button variant="outline">Войти</Button>
              </Link>
              <Button variant="primary" type="submit">
                Зарегистрироваться
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
