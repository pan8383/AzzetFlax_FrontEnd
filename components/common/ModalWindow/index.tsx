'use client';

import styles from './ModalWindow.module.css';
import { useState, useRef, useEffect, ReactNode } from 'react';

type Props = {
  trigger: ReactNode;
  children: ReactNode;
};

export default function Dropdown({ trigger, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen(prev => !prev);

  // 外部クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div onClick={toggle}>{trigger}</div>
      {isOpen && (
        <div className={styles.dropdownContent}>
          {children}
        </div>
      )}
    </div>
  );
}
