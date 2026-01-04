'use client';

import styles from './page.module.css';
import TableTitleButton from '@/components/common/TableTitleButton';
import { useBreadcrumbs } from '@/components/hooks/useBreadcrumbs';
import { getAdminAssetsPath, getAdminUsersPath } from '@/components/hooks/useNavigation';
import { ADMIN_PAGE } from '@/components/ui/Breadcrumbs/breadcrumbs';
import CrownIcon from '@/icons/CrownIcon';
import Link from 'next/link';

export default function Page() {
  const ADMIN_USERS_PATH = getAdminUsersPath();
  const ADMIN_ASSETS_PATH = getAdminAssetsPath();

  // パンくずリスト
  useBreadcrumbs(ADMIN_PAGE);

  return (
    <div className={styles.pageLayout}>
      {/* タイトル */}
      <TableTitleButton
        label="管理者ページ"
        icon={<CrownIcon stroke="var(--primary)" />}
        disabled
      />
      <nav className={styles.navigation}>
        <Link className={styles.navigationLink} href={ADMIN_USERS_PATH} >ユーザー管理へ</Link>
        <Link className={styles.navigationLink} href={ADMIN_ASSETS_PATH} >アセット管理へ</Link>
      </nav>
    </div>
  );
}
