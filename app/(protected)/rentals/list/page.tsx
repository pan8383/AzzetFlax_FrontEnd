'use client';

import styles from './page.module.css';
import TableTitleButton from '@/components/common/TableTitleButton';
import Grid2x2Icon from '@/icons/Grid2x2Icon';
import Pagination from '@/components/common/Pagination/Pagination';
import { useRentalHistory } from '@/components/hooks/useRentalHistory';
import RentalHistoryStatusFilter from './_components/RentalHistoryStatusFilter';
import RentalHistoryTableView from './_components/RentalHistoryTableView';

export default function Page() {
  const { history, pageInfo, loading, fetchError, updateQueryParams } = useRentalHistory(50);

  return (
    <div className={styles.pageLayout}>
      {/* タイトル */}
      <TableTitleButton
        label="レンタル履歴"
        icon={<Grid2x2Icon stroke="var(--primary)" />}
        disabled
      />
      <div className={styles.tableOptions}>
        {/* ステータスフィルター */}
        <RentalHistoryStatusFilter
          updateQueryParams={updateQueryParams}
        />
      </div>

      {/* カウンター */}
      <p>{pageInfo.totalElements} 件</p>

      {/* テーブル */}
      <RentalHistoryTableView
        history={history}
        totalPages={pageInfo.totalPages}
        updateQueryParams={updateQueryParams}
      />

      {/* ページネーション */}
      <Pagination
        currentPage={pageInfo.page + 1}
        totalPages={pageInfo.totalPages}
        onPageChange={(page) => updateQueryParams((prev) => ({ ...prev, page: page - 1 }))}
      />
    </div>
  );
}
