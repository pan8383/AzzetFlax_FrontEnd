'use client'

import styles from './NavigationMenus.module.css';
import BellDotIcon from "@/icons/BellDotIcon";
import ModalWindow from '@/components/common/ModalWindow';
import CircleUserRoundIcon from '@/icons/CircleUserRoundIcon';
import { useNavigateAdmin, useNavigateHome } from '@/components/hooks/useNavigation';
import LogOutIcon from '@/icons/LogOutIcon';
import BaseList from '@/components/common/BaseList';
import CrownIcon from '@/icons/CrownIcon';
import UserIcon from '@/icons/UserIcon';
import { useAuth } from '@/contexts/AuthContext';

export default function NavigationButtons() {
  const { user, logout } = useAuth();

  const navigateHome = useNavigateHome();
  const navigateAdmin = useNavigateAdmin();

  const handleLogout = async () => {
    try {
      // ログアウト処理をリクエスト
      logout();

      // ログアウト後にホームにリダイレクト
      navigateHome();

      // 成功したら強制リロード
      window.location.reload();
    } catch (err: any) {
      console.error(err);
    }
  }

  const userButtons = [
    {
      element: (
        <ModalWindow
          trigger={
            <button className={styles.notify_button}>
              <BellDotIcon
                stroke="var(--secondary)"
                strokeWidth={2}
                size={45}
              />
            </button>
          }
        >
          <p>新しい通知はありません</p>
        </ModalWindow>
      )
    },
    {
      element: (
        <ModalWindow
          trigger={
            <button className={styles.notify_button}>
              <CircleUserRoundIcon
                stroke="var(--secondary)"
                strokeWidth={2}
                size={45}
              />
            </button>
          }
        >
          <div className={styles.listItems}>
            <BaseList
              label='マイページ'
              icon={<UserIcon />}
              onClick={() => handleLogout()}
            />
            {user?.role === 'ADMIN' && (
              <BaseList
                label='管理者ページ'
                icon={<CrownIcon />}
                onClick={() => navigateAdmin()}
              />

            )}
            <BaseList
              label='ログアウト'
              icon={<LogOutIcon />}
              onClick={() => handleLogout()}
            />
          </div>
        </ModalWindow>
      )
    },
  ];
  return (
    <>
      {userButtons.map((btn, index) => (
        <div key={index}>
          {btn.element}
        </div>
      ))}
    </>
  );
}
