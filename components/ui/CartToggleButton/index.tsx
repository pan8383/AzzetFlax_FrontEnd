'use client';

import styles from './CartToggleButton.module.css';
import { useState } from "react";
import ShoppingCartIcon from "@/icons/ShoppingCartIcon";
import CartPanel from "../CartPanel";
import MenuBaseButton from '@/components/common/MenuBaseButton';
import Grid2x2Icon from '@/icons/Grid2x2Icon';
import { useNavigateAssets, useNavigateRentalHistory } from '@/components/hooks/useNavigation';

type CartToggleButtonProps = {
  count: number;
};

export default function CartToggleButton({ count }: CartToggleButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(prev => !prev);
  const handleClose = () => setIsOpen(false);

  return (
    <>{count > 0 && (
      <MenuBaseButton
        label={`${count > 0 ? `[ ${count} ]` : ''} `}
        icon={<ShoppingCartIcon />}
        variant="white"
        hoverable
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
