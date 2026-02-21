import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./Header.scss";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img
            src="/assets/images/Group3.png"
            alt="Travel"
            className="header__logo-image"
          />
        </Link>

        <nav className="header__nav">
          {!isAuthenticated ? (
            <Link to="/login" className="header__login">
              Войти
            </Link>
          ) : (
            <div className="header__user">
              <button
                className="header__user-btn"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <img
                  src={user?.avatar || "/assets/images/Ellipse1.png"}
                  alt="avatar"
                  className="header__avatar"
                />
                <span className="header__user-name">
                  {user?.fullName || user?.email || "Профиль"}
                </span>
                <svg
                  className={`header__arrow ${menuOpen ? "header__arrow--open" : ""}`}
                  width="14"
                  height="11"
                  viewBox="0 0 14 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 11L0.937823 0.5L13.0622 0.5L7 11Z" fill="white" />
                </svg>
              </button>

              {menuOpen && (
                <div className="header__dropdown">
                  <Link
                    to="/profile"
                    className="header__dropdown-item"
                    onClick={() => setMenuOpen(false)}
                  >
                    Профиль
                  </Link>
                  <button
                    className="header__dropdown-item"
                    onClick={handleLogout}
                  >
                    Выйти
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
