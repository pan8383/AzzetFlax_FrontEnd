import styles from './TableTitleButton.module.css';
import { ReactNode } from "react";

type TableTitleButtonProps = {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  icon?: ReactNode;
}

export default function TableTitleButton({
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
}: TableTitleButtonProps) {
  const className = `${styles.button} ${styles[variant]} ${styles[size]}`;

  return (
    <button
      className={className}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{label}</span>
    </button>
  );
}
