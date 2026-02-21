import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Hero from "../../components/common/Hero/Hero";
import Button from "../../components/common/Button/Button";
import { useAuth } from "../../context/AuthContext";
import "./AuthPages.scss";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Заполните все поля");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      console.log("Trying to login with:", email);
      await login(email, password);
      console.log("Login successful, navigating to home");
      navigate("/");
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Неверный email или пароль");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Hero title="Истории ваших путешествий" />
      <div className="auth-page">
        <div className="auth-form">
          <h1 className="auth-title">Вход в профиль</h1>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>
                <span className="required-star">*</span>
                <span className="field-label">Логин</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Логин"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-field">
              <label>
                <span className="required-star">*</span>
                <span className="field-label">Пароль</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                required
                disabled={isLoading}
              />
            </div>

            <div className="auth-actions">
              <Link to="/register">
                <Button variant="outline" disabled={isLoading}>
                  Зарегистрироваться
                </Button>
              </Link>
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? "Вход..." : "Войти"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
