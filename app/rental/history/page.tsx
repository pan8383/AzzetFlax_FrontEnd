'use client';

import TableTitleButton from '@/components/common/TableTitleButton';
import styles from './page.module.css';
import { useNavigateHome } from '@/components/hooks/useNavigation';
import Grid2x2Icon from '@/icons/Grid2x2Icon';
import RentalHistoryTableView from './_components/RentalHistoryTableView';
import Pagination from '@/components/common/Pagination/Pagination';
import { useRentalHistory } from '@/components/hooks/useRentalHistory';

export default function Register() {
  const navigateHome = useNavigateHome();
  const { histories, pageInfo, loading, fetchError, updateQueryParams } = useRentalHistory(10);


  return (
    <div className={styles.pageContainer}>
      {/* タイトル */}
      <TableTitleButton
        label="レンタル履歴"
        icon={<Grid2x2Icon stroke="var(--primary)" />}
        disabled
      />

      <p>{pageInfo.totalElements} 件</p>

      {/* テーブル */}
      <RentalHistoryTableView histories={histories} />

      {/* ページネーション */}
      <Pagination
        currentPage={pageInfo.page + 1}
        totalPages={pageInfo.totalPages}
        onPageChange={(page) => updateQueryParams((prev) => ({ ...prev, page: page - 1 }))}
      />
    </div>
  );
}
