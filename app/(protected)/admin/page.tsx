'use client';

import styles from './page.module.css';
import TableTitleButton from '@/components/common/TableTitleButton';
import { useAssetManagementPath, useUsersPath } from '@/components/hooks/useNavigation';
import CrownIcon from '@/icons/CrownIcon';
import Link from 'next/link';

export default function Page() {
  const USERS_PATH = useUsersPath();
  const ASSET_MANAGEMENT_PATH = useAssetManagementPath();


  return (
    <div className={styles.pageLayout}>
      {/* タイトル */}
      <TableTitleButton
        label="管理者ページ"
        icon={<CrownIcon stroke="var(--primary)" />}
        disabled
      />
      <nav className={styles.navigation}>
        <Link className={styles.navigationLink} href={USERS_PATH} >ユーザー管理へ</Link>
        <Link className={styles.navigationLink} href={ASSET_MANAGEMENT_PATH} >アセット管理へ</Link>
      </nav>
    </div>
  );
}
