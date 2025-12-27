import styles from './SubNavigation.module.css';
import ArrowIcon from "@/icons/ArrowIcon";
import Grid2x2Icon from "@/icons/Grid2x2Icon";
import { useNavigateAssets, useNavigateRentalHistory, useNavigateRentalReturn } from "@/components/hooks/useNavigation";
import CartToggleButton from "@/components/ui/CartToggleButton";
import { useCart } from "@/contexts/RentalCartContext";
import MenuBaseButton from '@/components/common/MenuBaseButton';
import HistoryIcon from '@/icons/HistoryIcon';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

type NavigationName = null | 'assets' | 'history' | 'return';

export function NavigationMenus() {
  const navigateAssets = useNavigateAssets();
  const navigateRentalHistory = useNavigateRentalHistory();
  const navigateRentalReturn = useNavigateRentalReturn();
  const pathname = usePathname();
  let navigationName: NavigationName = null;

  if (pathname.startsWith('/asset')) {
    navigationName = 'assets';
  } else if (pathname.endsWith('/history')) {
    navigationName = 'history';
  } else if (pathname.endsWith('/return')) {
    navigationName = 'return';
  }

  const handleAssetsClick = () => {
    navigateAssets();
  };

  const handleHistoryClick = () => {
    navigateRentalHistory();
  };

  const handleReturnClick = () => {
    navigateRentalReturn();
  };

  return (
    <div className={styles.layout}>

      {/* レンタル履歴 */}
      <MenuBaseButton
        label="レンタル履歴"
        variant="white"
        icon={<HistoryIcon />}
        onClick={handleHistoryClick}
        hoverable
        isActive={navigationName === 'history'}
      />

      {/* アセット返却 */}
      <MenuBaseButton
        label="返す"
        variant="white"
        icon={<HistoryIcon />}
        onClick={handleReturnClick}
        hoverable
        isActive={navigationName === 'return'}
      />

      {/* アセット一覧 */}
      <MenuBaseButton
        label="レンタル"
        variant="white"
        icon={<Grid2x2Icon />}
        onClick={handleAssetsClick}
        hoverable
        isActive={navigationName === 'assets'}
      />
    </div>
  );
}