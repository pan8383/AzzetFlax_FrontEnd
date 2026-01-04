'use client'

import styles from './ReloadButton.module.css';
import clsx from 'clsx';
import ListRestartIcon from '@/icons/ListRestartIcon';

type ButtonProps = {
  className?: string;
  disabled?: boolean;
  active?: boolean;
  onClick: () => void;
};

export default function ReloadButton({
  className,
  disabled = false,
  active = true,
  onClick,
}: ButtonProps) {

  const buttonClass = clsx(
    className || styles.button,
    active && styles.active,
  );

  return (
    <button
      className={buttonClass}
      type='button'
      onClick={onClick}
      disabled={disabled}
    >
      <ListRestartIcon />
    </button>
  );
}
