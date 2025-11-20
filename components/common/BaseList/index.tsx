import styles from './BaseList.module.css';
import clsx from 'clsx';
import { ButtonProps } from '@/types/baseButton';

export default function BaseList({
  className,
  label,
  icon,
  disabled = false,
  onClick,
}: ButtonProps) {

  // セレクタがない場合はデフォルトのセレクタを選択する
  const buttonClass = clsx(
    className || styles.button,
  );

  return (
    <button
      className={buttonClass}
      type='button'
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