'use client';

import styles from './page.module.css';
import BaseButton from '@/components/common/BaseButton';
import { useNavigateHome } from '@/components/hooks/useNavigation';
import TableTitleButton from '@/components/common/TableTitleButton';
import Grid2x2Icon from '@/icons/Grid2x2Icon';
import RentalHistoryStatusFilter from '../list/_components/RentalHistoryStatusFilter';
import RentalHistoryTableView from '../list/_components/RentalHistoryTableView';
import Pagination from '@/components/common/Pagination/Pagination';
import { useRentalHistory } from '@/components/hooks/useRentalHistory';
import { useRentalReturnItems } from '@/components/hooks/useRentalReturnItems';
import { useRentalReturn } from '@/contexts/RentalReturnContext';

export default function Register() {
  const navigateHome = useNavigateHome();
  const { histories, pageInfo, loading, fetchError, updateQueryParams } = useRentalHistory(50);
  const { postReturnItems, isReturning, returnError, returnSuccess } = useRentalReturnItems();
  const { returnItems } = useRentalReturn();

  const handleReturnClick = async () => {
    if (returnItems.length === 0) {
      alert('返却するアイテムがありません。');
      return;
    }

    const res = await postReturnItems();
    if (res) {
      alert('返却処理が完了しました！');
      navigateHome();
    } else {
      alert('返却に失敗しました。');
    }
    navigateHome();
  };

  return (
    <div className={styles.pageLayout}>
      {/* タイトル */}
      <TableTitleButton
        label="返す"
        icon={<Grid2x2Icon stroke="var(--primary)" />}
        disabled
      />
      <div className={styles.tableOptions}>

        {/* 返却ボタン */}
        <BaseButton
          label='返却する'
          size='sm'
          variant='dark'
          onClick={handleReturnClick}
          disabled={isReturning}
        />
      </div>

      {/* カウンター */}
      <p>{pageInfo.totalElements} 件</p>

      {/* テーブル */}
      <RentalHistoryTableView
        histories={histories}
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
