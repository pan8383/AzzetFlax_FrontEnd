import styles from './MenuBaseButton.module.css';
import clsx from 'clsx';
import { ReactNode } from 'react';

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

export default function MenuBaseButton({
  className,
  label,
  type = 'button',
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