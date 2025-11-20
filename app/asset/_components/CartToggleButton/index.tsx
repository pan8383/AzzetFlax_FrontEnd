'use client';

import styles from './CartToggleButton.module.css';
import { useEffect, useState } from "react";
import ShoppingCartIcon from "@/icons/ShoppingCartIcon";
import CartPanel from "../CartPanel";

type CartToggleButtonProps = {
  count: number;
};

export default function CartToggleButton({ count }: CartToggleButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(prev => !prev);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button
        className={styles.cartButton}
        onClick={handleToggle}>

        {count != 0 && (
          <span className={styles.totalQuantityCounter}>{count}</span>
        )}

        <ShoppingCartIcon
          stroke="var(--secondary)"
          strokeWidth={2}
          size={45}
        />
      </button>

      {/* サイドパネル */}
      {isOpen && (
        <>
          {/* 背景 */}
          <div className={styles.hiddenScreen} onClick={handleClose}></div>

          {/* カートパネル */}
          <CartPanel onClose={handleClose} />
        </>
      )}

    </>
  );
}
