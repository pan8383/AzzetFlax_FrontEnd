'use client'

import { useNavigateLogin } from '@/components/hooks/useNavigation';
import styles from './NavigationMenus.module.css';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/RentalCartContext';
import CartToggleButton from '@/app/asset/_components/CartToggleButton';
import NavigationButtons from '../NavigationButtons';
import BaseButton from '@/components/common/BaseButton';


export default function NavigationMenus() {
  const handleNavigateLogin = useNavigateLogin();
  const { user } = useAuth();
  const { totalQuantity } = useCart();

  return (
    <>
      <nav className={styles.nav}>
        {user ? (
          <>
            {/* カートボタン */}
            < CartToggleButton count={totalQuantity} />

            {/* ユーティリティ */}
            <NavigationButtons />
          </>
        ) : (
          <>
            <BaseButton label="ログイン" type='button' variant="white" size="sm" onClick={handleNavigateLogin} />
          </>
        )}
      </nav>
    </>
  );
}
