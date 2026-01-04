'use client';

import styles from './AssetTableView.module.css';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { BaseTable } from '@/components/common/BaseTable';
import { AssetsQueryParams } from '@/components/hooks/useAssets';
import { Asset } from '@/types/api/api';
import { getAssetDeleteApiPath, useNavigateAssetAdminDetail } from '@/components/hooks/useNavigation';
import { deleteApi } from '@/lib/deleteApi';

type Props = {
  assets: Asset[];
  updateQueryParams: (updater: (prev: AssetsQueryParams) => AssetsQueryParams) => void;
  totalPages?: number;
  onDeleted?: () => void;
}

type AssetTableColumn = Asset & {
  actions?: React.ReactNode
};

export default function AssetTableView({ assets, updateQueryParams, totalPages, onDeleted }: Props) {
  const navigateAssetAdminDetail = useNavigateAssetAdminDetail();

  const handleDelete = async (
    e: React.MouseEvent,
    assetId: string
  ) => {
    e.stopPropagation();

    if (!confirm('このアセットを削除しますか？')) return;

    try {
      await deleteApi(getAssetDeleteApiPath(assetId));
      onDeleted?.();
    } catch {
      alert('削除に失敗しました');
    }
  };

  const columnHelper = createColumnHelper<AssetTableColumn>();
  const columns: ColumnDef<AssetTableColumn, any>[] = [
    columnHelper.accessor('name', {
      header: '名前',
      cell: info => <i>{info.getValue()}</i>,

    }),
    columnHelper.accessor('categoryName', {
      header: 'カテゴリー',
      cell: info => info.renderValue(),
      enableSorting: false,
    }),
    columnHelper.accessor('model', {
      header: '型番',
    }),
    columnHelper.accessor('manufacturer', {
      header: 'メーカー',
    }),
    columnHelper.accessor('isAvailable', {
      header: '利用可能',
      size: 50,
      cell: info => info.getValue() ? '○' : '×',
      enableSorting: false,
    }),
    columnHelper.accessor('totalStock', {
      header: '在庫',
      size: 50,
      enableSorting: false,
    }),
    columnHelper.accessor('availableStock', {
      header: '残り',
      size: 50,
      enableSorting: false,
    }),
    columnHelper.display({
      id: 'delete',
      header: '削除',
      size: 70,
      cell: ({ row }) => (
        <button
          className={styles.deleteAssetButton}
          onClick={(e) =>
            handleDelete(e, row.original.assetId)
          }
        >
          削除
        </button>
      ),
      enableSorting: false,
    }),
  ]

  const handleRow = (row: AssetTableColumn) => {
    navigateAssetAdminDetail(row.assetId);
  };


  if (assets.length === 0) return <div>データがありません。</div>;

  return (
    <BaseTable<AssetTableColumn>
      data={assets}
      columns={columns}
      totalPages={totalPages}
      onSort={(field, direction) => {
        // actions 列は無視
        if (field === 'actions') return;

        updateQueryParams(prev => ({
          ...prev,
          sortField: field,
          sortDirection: direction,
          page: 0,
        }))
      }}
      onRowClick={handleRow}
    />
  );
}
