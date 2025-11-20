'use client';

import { useEffect, useState } from 'react';
import styles from './SideMenu.module.css';
import CloseIcon from '@/icons/CloseIcon';
import SideMenuIcon from '@/icons/SideMenuIcon';

export default function SideMenu() {
  const [isOpen, setOpen] = useState(false);

  const handleToggle = () => setOpen(!isOpen);

  return (
    <div className={styles.side_menu_container}>

      {/* メニュー開閉ボタン（ページ上に固定） */}
      <button className={styles.menu_button} onClick={handleToggle}>
        <SideMenuIcon stroke="var(--primary)" strokeWidth={2} />
      </button>

      {/* サイドメニュー */}
      {isOpen && (
        <div className={styles.side_menu_wrapper}>
          <div className={styles.side_menu_content}>

            {/* メニュー項目 */}
            <ul className={styles.menu_list}>
              <li>aaa</li>
              <li>bbb</li>
              <li>ccc</li>
            </ul>

            {/* クローズボタン */}
            <button className={styles.close_button} onClick={handleToggle}>
              <CloseIcon stroke="var(--secondary)" strokeWidth={2} size={32} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
