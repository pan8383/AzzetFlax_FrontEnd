'use client';

import styles from './page.module.css';
import { SubNavigation } from './_components/SubNavigation';
import { MineTable } from './_components/MineTable';
import { AnnounceTable } from './_components/AnnounceTable';
import SideMenu from '@/components/ui/SideMenu';
import ProtectedRoute from '@/context/ProtectedRoute';

/**
 * ホームページ
 * - 左側に固定のサイドメニュー
 * - 上部にサブナビゲーション
 * - 下部に複数テーブル
 */
export default function Home() {
  return (
    <div className={styles.layout}>
      {/* サイドメニュー */}
      <aside className={styles.side_menu_wrapper}>
        <SideMenu />
      </aside>

      {/* メインコンテンツ */}
      <main className={styles.main_content}>

        {/* サブナビゲーション */}
        <div className={styles.sub_nav_wrapper}>
          <SubNavigation />
        </div>

        {/* お知らせテーブル */}
        {/* <section className={styles.base_table_container}>
          <AnnounceTable />
        </section> */}

        {/* 自分用テーブル */}
        {/* <section className={styles.base_table_container}>
          <MineTable />
        </section> */}
      </main>
    </div>
  );
}