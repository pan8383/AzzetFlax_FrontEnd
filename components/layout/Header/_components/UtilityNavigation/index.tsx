'use client'

import styles from './NavigationMenus.module.css';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigateLogin } from '@/components/hooks/useNavigation';
import NavigationButtons from '../NavigationButtons';
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
            <button
              className={styles.loginButton}
              type='button'
              onClick={handleNavigateLogin}>
              ログイン
            </button>
          </>
        )}
      </nav>
    </>
  );
}
