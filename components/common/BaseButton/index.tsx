'use client'

import styles from './BaseButton.module.css';
import { ReactNode } from 'react';
import clsx from 'clsx';

type ButtonProps = {
  className?: string;
  label?: string;
  type?: 'button' | 'submit';
  variant?: 'white' | 'dark' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  disabled?: boolean;
  hoverable?: boolean;
  isActive?: boolean;
  onClick?: () => void;
};

export default function BaseButton({
  className,
  label,
  type = 'button',
  variant = 'white',
  size = 'lg',
  icon,
  disabled = false,
  hoverable = false,
  isActive = false,
  onClick,
}: ButtonProps) {

  // セレクタがない場合はデフォルトのセレクタを選択する
  const buttonClass = clsx(
    styles.button,
    !className && styles[variant],
    !className && styles[size],
    hoverable && styles.hoverable,
    isActive && styles.active,
    className,
  );

  return (
    <button
      className={buttonClass}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {icon &&
        <span
          className={styles.icon}>
          {icon}
        </span>
      }
      {label}
    </button>
  );
}