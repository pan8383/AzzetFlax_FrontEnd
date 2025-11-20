import styles from './BaseButton.module.css';
import clsx from 'clsx';
import { ButtonProps } from '@/types/baseButton';

export default function BaseButton({
  className,
  label,
  type = 'button',
  variant = 'white',
  size = 'lg',
  icon,
  disabled = false,
  hoverable = false,
  onClick,
}: ButtonProps) {

  // セレクタがない場合はデフォルトのセレクタを選択する
  const buttonClass = clsx(
    className || styles.button,
    !className && styles[variant],
    !className && styles[size],
    hoverable && styles.hoverable,
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