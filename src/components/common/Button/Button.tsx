import React from "react";
import "./Button.scss";

interface ButtonProps {
  variant?: "primary" | "outline" | "back";
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      className={`btn btn--${variant} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {variant === "back" && <span className="btn__icon">←</span>}
      <span className="btn__text">{children}</span>
    </button>
  );
};

export default Button; // ВАЖНО
