'use client'

import styles from './MenuBaseButton.module.css';
import { ReactNode } from 'react';

type ButtonProps = {
  label?: string;
  icon?: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
};

export default function MenuBaseButton({
  label,
  icon,
  isActive = false,
  onClick,
}: ButtonProps) {

  return (
    <button
      className={styles.menuButton}
      type='button'
      onClick={onClick}
      disabled={isActive == true}
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