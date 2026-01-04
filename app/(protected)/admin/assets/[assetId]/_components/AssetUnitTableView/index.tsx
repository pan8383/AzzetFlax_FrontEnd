'use client';

import styles from './AssetUnitTableView.module.css';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { BaseTable } from '@/components/common/BaseTable';
import { AssetUnitDetail } from '@/types/api/api';
import { formatDateTime } from '@/utils/formatDate';
import { useStore } from '@/lib/store';
import { getAssetUnitsDeleteApiPath, useNavigateAssetAdminUnitDetail } from '@/components/hooks/useNavigation';
import { deleteApi } from '@/lib/deleteApi';

type Props = {
  assetUnits: AssetUnitDetail[];
  onDeleted?: () => void;
};

type TableRow = AssetUnitDetail;

export default function AssetUnitTableView({ assetUnits, onDeleted }: Props) {
  const navigateToUnitDetail = useNavigateAssetAdminUnitDetail();
  const setSelectedUnit = useStore((state) => state.setSelectedUnit);
  const columnHelper = createColumnHelper<TableRow>();

  const handleDelete = async (
    e: React.MouseEvent,
    unitId: string
  ) => {
    e.stopPropagation();

    if (!confirm('このユニットを削除しますか？')) return;

    try {
      await deleteApi(getAssetUnitsDeleteApiPath(unitId));
      onDeleted?.();
    } catch {
      alert('削除に失敗しました');
    }
  };

  const columns: ColumnDef<TableRow, any>[] = [
    columnHelper.accessor('unitId', {
      header: 'ユニットID',
    }),
    columnHelper.accessor('serialNumber', {
      header: 'シリアルナンバー',
    }),
    columnHelper.accessor('locationName', {
      header: '管理所在地',
    }),
    columnHelper.accessor('status', {
      header: 'ステータス',
    }),
    columnHelper.accessor('purchaseDate', {
      header: '購入日',
      cell: ({ getValue }) => formatDateTime(getValue()),
    }),
    columnHelper.accessor('purchasePrice', {
      header: '購入金額',
    }),
    columnHelper.accessor('remarks', {
      header: '備考',
    }),
    columnHelper.display({
      id: 'delete',
      header: '削除',
      size: 70,
      cell: ({ row }) => (
        <button
          className={styles.deleteUnitButton}
          onClick={(e) =>
            handleDelete(e, row.original.unitId)
          }
        >
          削除
        </button>
      ),
      enableSorting: false,
    }),
  ];

  if (assetUnits.length === 0) return <div>データがありません。</div>;

  return (
    <BaseTable<TableRow>
      data={assetUnits}
      columns={columns}
      onRowClick={(row) => {
        setSelectedUnit(row);
        navigateToUnitDetail(row.assetId, row.unitId);
      }}
    />
  );
}
