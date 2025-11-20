'use client'

import styles from './NavigationMenus.module.css';
import BellDotIcon from "@/icons/BellDotIcon";
import ModalWindow from '@/components/common/ModalWindow';
import CircleUserRoundIcon from '@/icons/CircleUserRoundIcon';
import { useLogoutPath, useNavigateHome } from '@/components/hooks/useNavigation';
import LogOutIcon from '@/icons/LogOutIcon';
import BaseList from '@/components/common/BaseList';
import { postLogoutRequest } from '@/app/_api/logout/route';

export default function NavigationButtons() {
  const navigateHome = useNavigateHome();
  const logoutPath = useLogoutPath();

  const handleLogout = async () => {
    try {
      await postLogoutRequest(logoutPath); // サーバにリクエスト

      // ログアウト後にホームにリダイレクト
      navigateHome();

      // 成功したら強制リロード
      window.location.reload();
    } catch (err) {
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
          <p>通知内容をここに表示。</p>
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
          <BaseList
            label='ログアウト'
            icon={<LogOutIcon />}
            onClick={() => handleLogout()}
          />
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
