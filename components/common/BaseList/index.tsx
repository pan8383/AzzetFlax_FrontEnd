'use client';

import styles from './BaseList.module.css';
import { ReactNode } from 'react';
import clsx from 'clsx';

type ButtonProps = {
  className?: string;
  label?: string;
  type?: 'button';
  variant?: 'white' | 'dark' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  disabled?: boolean;
  hoverable?: boolean;
  isActive?: boolean;
  onClick?: () => void;
};

export default function BaseList({
  className,
  label,
  type,
  icon,
  disabled = false,
  hoverable = false,
  isActive = false,
  onClick,
}: ButtonProps) {

  // セレクタがない場合はデフォルトのセレクタを選択する
  const buttonClass = clsx(
    className || styles.button,
    hoverable && styles.hoverable,
    isActive && styles.active,
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