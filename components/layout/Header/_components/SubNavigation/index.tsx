'use client'

import styles from './SubNavigation.module.css';
import Grid2x2Icon from "@/icons/Grid2x2Icon";
import { getRentalListPath, useNavigateHome, useNavigateRentalList } from "@/components/hooks/useNavigation";
import MenuBaseButton from '@/components/common/MenuBaseButton';
import HistoryIcon from '@/icons/HistoryIcon';
import { usePathname } from 'next/navigation';

type NavigationName = null | 'assets' | 'rentalList';

export function NavigationMenus() {
  const navigateHome = useNavigateHome();
  const navigateRentalHistory = useNavigateRentalList();
  const pathname = usePathname();
  let navigationName: NavigationName = null;

  if (pathname === '/') {
    navigationName = 'assets';
  } else if (pathname.endsWith(getRentalListPath())) {
    navigationName = 'rentalList';
  }

  const handleAssetsClick = () => {
    navigateHome();
  };

  const handleHistoryClick = () => {
    navigateRentalHistory();
  };

  return (
    <div className={styles.layout}>

      {/* レンタル履歴 */}
      <MenuBaseButton
        label="レンタル履歴"
        icon={<HistoryIcon />}
        onClick={handleHistoryClick}
        isActive={navigationName === 'rentalList'}
      />

      {/* アセット一覧 */}
      <MenuBaseButton
        label="レンタル"
        icon={<Grid2x2Icon />}
        onClick={handleAssetsClick}
        isActive={navigationName === 'assets'}
      />
    </div>
  );
}