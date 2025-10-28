'use client';

import styles from './page.module.css';
import { SubNavigation } from './_components/SubNavigation';
import BaseTable, { Column } from '@/components/common/BaseTable';
import { useAssets } from '@/components/hooks/useAssets';
import FrameIcon from '@/icons/FrameIcon';
import TableTitleButton from '@/components/common/TableTitleButton';

export default function Home() {
  const { assets, loading, fetchError, pageInfo, updateQueryParams } = useAssets();

  const columns: Column<typeof assets[0]>[] = [
    { key: 'assetId', label: 'ID', sortable: true },
    { key: 'name', label: '名前', sortable: true },
    { key: 'category', label: 'カテゴリ', sortable: true },
    { key: 'model', label: 'モデル', sortable: true },
    { key: 'stock', label: '在庫', sortable: true },
  ];

  const handleSort = (field: keyof typeof assets[0]) => {
    updateQueryParams(prev => ({
      ...prev,
      sortField: field,
      sortDirection: prev.sortField === field && prev.sortDirection === 'asc' ? 'desc' : 'asc',
      page: 0,
    }));
  };

  if (loading) return <div className={styles.container}>読み込み中...</div>;
  if (fetchError) return <div className={styles.container}>データ取得エラー...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.sub_nav_wrapper}>
        <SubNavigation />
      </div>
      <div className={styles.base_table_wrapper}>
        <TableTitleButton
          label='Mine'
          icon={
            <FrameIcon
              stroke="var(--primary)"
              strokeWidth={2}
            />
          } />
        <BaseTable
          columns={columns}
          data={assets}
          onSort={handleSort}
          onRowClick={row => console.log(row)}
        />
      </div>
    </div>
  );
}
