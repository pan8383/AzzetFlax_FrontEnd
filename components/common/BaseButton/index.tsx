import { ButtonProps } from '@/types/baseButton';
import styles from './BaseButton.module.css';

export default function BaseButton({
  label,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
}: ButtonProps) {
  const className = `${styles.button} ${styles[variant]} ${styles[size]}`;

  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}>
      {icon
        &&
        <span
          className={styles.icon}>
          {icon}
        </span>}
      {label}
    </button>
  );
}