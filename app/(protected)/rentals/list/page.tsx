'use client';

import styles from './page.module.css';
import TableTitleButton from '@/components/common/TableTitleButton';
import Pagination from '@/components/common/Pagination/Pagination';
import { useRentalList } from '@/components/hooks/useRentalList';
import { useBreadcrumbs } from '@/components/hooks/useBreadcrumbs';
import RentalsTableView from './_components/RentalsTableView';
import RentalListStatusFilter from './_components/RentalListStatusFilter';
import { RENTAL_LIST } from '@/components/ui/Breadcrumbs/breadcrumbs';
import HistoryIcon from '@/icons/HistoryIcon';

export default function Page() {
  const { rentals, pageInfo, loading, fetchError, updateQueryParams, searchParams } = useRentalList(20);

  // パンくずリスト
  useBreadcrumbs(RENTAL_LIST);

  return (
    <div className={styles.pageLayout}>
      {/* タイトル */}
      <TableTitleButton
        label="レンタル履歴"
        icon={<HistoryIcon stroke="var(--primary)" />}
        disabled
      />
      <div className={styles.tableOptions}>
        {/* ステータスフィルター */}
        <RentalListStatusFilter
          updateQueryParams={updateQueryParams}
        />
      </div>

      {/* カウンター */}
      <p>{pageInfo.totalElements} 件</p>

      <div className={styles.listWrapper}>
        {/* テーブル */}
        <RentalsTableView
          rentals={rentals}
          updateQueryParams={updateQueryParams}
          sortField={searchParams.sortField}
          sortDirection={searchParams.sortDirection}
          totalPages={pageInfo.totalPages}
        />

        {/* ページネーション */}
        <Pagination
          currentPage={pageInfo.page + 1}
          totalPages={pageInfo.totalPages}
          onPageChange={(page) => updateQueryParams((prev) => ({ ...prev, page: page - 1 }))}
        />
      </div>
    </div>
  );
}
