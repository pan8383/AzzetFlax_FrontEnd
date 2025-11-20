import TableTitleButton from '@/components/common/TableTitleButton';
import styles from './AnnounceTable.module.css';
import BaseTable, { Column } from '@/components/common/BaseTable';
import Pagination from '@/components/common/Pagination/Pagination';
import { useAssets } from '@/components/hooks/useAssets';
import MegaphoneIcon from '@/icons/MegaphoneIcon';

export function AnnounceTable() {
  const label = 'お知らせ';
  const rowSize = 5;
  const { assets, loading, fetchError, pageInfo, updateQueryParams } = useAssets(rowSize);

  // テーブルヘッダー
  const columns: Column<typeof assets[0]>[] = [
    { key: 'assetId', label: 'ID', sortable: true },
    { key: 'name', label: '名前', sortable: true },
    { key: 'categoryName', label: 'カテゴリ', sortable: true },
    { key: 'model', label: 'モデル', sortable: true },
    { key: 'totalStock', label: '在庫', sortable: true },
  ];

  const handleSort = (field: keyof typeof assets[0]) => {
    updateQueryParams(prev => ({
      ...prev,
      sortField: field,
      sortDirection: prev.sortField === field && prev.sortDirection === 'asc' ? 'desc' : 'asc',
      page: 0,
    }));
  };

  // ローダー
  if (loading) return <div className={styles.container}>読み込み中...</div>;
  if (fetchError) return <div className={styles.container}>データ取得エラー...</div>;

  return (
    <div className={styles.layout}>
      <TableTitleButton
        label={label}
        icon={<MegaphoneIcon stroke="var(--primary)" strokeWidth={2} />}
      />

      {fetchError ? (
        <div className="error-message">サーバに接続できませんでした。</div>
      ) : assets.length === 0 ? (
        <div className="no-data">データがありません。</div>
      ) : (
        <BaseTable
          columns={columns}
          data={assets}
          onSort={handleSort}
          onRowClick={row => console.log(row)}
        />
      )}
    </div>
  );
}
