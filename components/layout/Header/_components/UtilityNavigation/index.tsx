'use client'

import styles from './NavigationMenus.module.css';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigateLogin } from '@/components/hooks/useNavigation';
import NavigationButtons from '../NavigationButtons';
import BaseButton from '@/components/common/BaseButton';
import CartToggleButton from '@/components/ui/CartToggleButton';
import { useCart } from '@/contexts/RentalCartContext';


export default function UtilityNavigation() {
  const handleNavigateLogin = useNavigateLogin();
  const { user } = useAuth();
  const { totalQuantity } = useCart();


  return (
    <>
      <nav className={styles.nav}>
        {user ? (
          <>
            {/* カートボタン */}
            < CartToggleButton
              count={totalQuantity}
            />
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
