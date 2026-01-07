'use client';

import styles from './page.module.css';
import TableTitleButton from '@/components/common/TableTitleButton';
import { useBreadcrumbs } from '@/components/hooks/useBreadcrumbs';
import { RENTAL_LIST_DETAIL } from '@/components/ui/Breadcrumbs/breadcrumbs';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import RentalListDetailTableView from './_components/RentalListDetailTableView';
import { useRentalDetailList } from '@/components/hooks/useRentalDetailList';
import { useRentalReturn } from '@/contexts/RentalReturnContext';
import HistoryIcon from '@/icons/HistoryIcon';

export default function Page() {
  const { rentalId = '' } = useParams<{ rentalId?: string }>();
  const { rentalDetails, loading, fetchError, refetch } = useRentalDetailList({ rentalId });
  const {
    returnItems,
    addToReturnItem,
    removeFromItem,
    clearItems,
    executeReturn,
    isReturning,
    returnError,
    returnSuccess,
  } = useRentalReturn();

  const breadcrumbs = useMemo(
    () => (rentalId ? RENTAL_LIST_DETAIL(rentalId) : []),
    [rentalId]
  );

  const handleClick = async () => {
    await executeReturn();
    await refetch();
  }

  // パンくずリスト
  useBreadcrumbs(breadcrumbs);

  return (
    <div className={styles.pageLayout}>
      {/* タイトル */}
      <TableTitleButton
        label="レンタル詳細"
        icon={<HistoryIcon stroke="var(--primary)" />}
        disabled
      />

      <div className={styles.returnButtonWrapper}>
        <button
          className={styles.returnButton}
          onClick={handleClick}
          disabled={returnItems.length === 0 || isReturning}
        >
          返却
        </button>
      </div>

      {/* テーブル */}
      <RentalListDetailTableView
        rentalId={rentalId}
        rentalDetails={rentalDetails}
      />
    </div>
  );
}
