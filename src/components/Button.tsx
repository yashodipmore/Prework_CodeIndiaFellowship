import React from 'react';
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}

/**
 * A reusable button component with different variants
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  onClick,
}) => {
  return (
    <button
      className={`button ${variant}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
