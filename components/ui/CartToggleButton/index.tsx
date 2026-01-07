'use client';

import styles from './CartToggleButton.module.css';
import { useState } from "react";
import ShoppingCartIcon from "@/icons/ShoppingCartIcon";
import CartPanel from "../CartPanel";
import MenuBaseButton from '@/components/common/MenuBaseButton';

type Props = {
  count: number;
};

export default function CartToggleButton({ count }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(prev => !prev);
  const handleClose = () => setIsOpen(false);

  return (
    <>{count > 0 && (
      <MenuBaseButton
        label={`${count > 0 ? `[ ${count} ]` : ''} `}
        icon={<ShoppingCartIcon />}
        onClick={handleToggle}
      />
    )}
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
