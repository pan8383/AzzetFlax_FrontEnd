'use client';

import styles from './RentalHistoryTableView.module.css';
import { useNavigateRentalHistoryDetail } from '@/components/hooks/useNavigation';
import { BaseTable } from '@/components/common/BaseTable';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { RentalHistory } from '@/types/api/api';
import { formatDate } from '@/utils/formatDate';
import { useEffect, useState } from 'react';
import { useRentalReturn } from '@/contexts/RentalReturnContext';
import { RentalHistoryQueryParams } from '@/components/hooks/useRentalHistory';

type Props = {
  history: RentalHistory[] | [];
  totalPages?: number;
  updateQueryParams: (updater: (prev: RentalHistoryQueryParams) => RentalHistoryQueryParams) => void;
};

type RentalHistoryColumn = RentalHistory & {
  returnItem: boolean;
}

export default function RentalHistoryTableView({ history, totalPages, updateQueryParams }: Props) {
  const navigateToDetail = useNavigateRentalHistoryDetail();
  const [tableData, setTableData] = useState<RentalHistoryColumn[]>([]);
  const { returnItems, addToReturnItem, removeFromItem } = useRentalReturn();

  const columnHelper = createColumnHelper<RentalHistoryColumn>();
  const columns: ColumnDef<RentalHistoryColumn, any>[] = [
    columnHelper.accessor('rentalId', {
      header: 'レンタルID',
      cell: info => <i>{info.getValue()}</i>,
      size: 260,
    }),
    columnHelper.accessor('unitId', {
      header: 'ユニットID',
      cell: info => info.renderValue(),
      size: 260,
    }),
    columnHelper.accessor('status', {
      header: 'ステータス',
      maxSize: 100,
      cell: ({ getValue }) => {
        const status = getValue();

        const statusMap: Record<string, string> = {
          RETURNED: "返却済み",
          RENTED: "レンタル中",
        };

        return (
          <span
            className={
              status === "RETURNED"
                ? styles.returned
                : styles.rented
            }
          >
            {statusMap[status] ?? '不明'}
          </span>
        );
      }
    }),
    columnHelper.accessor('due', {
      header: '期限',
      minSize: 60,
      cell: ({ getValue }) => formatDate(getValue()),
    }),
    columnHelper.accessor('returnAt', {
      header: '返却日',
      minSize: 60,
      cell: ({ getValue }) => formatDate(getValue()),
    }),
    columnHelper.accessor('createdAt', {
      header: 'レンタル日',
      minSize: 60,
      cell: ({ getValue }) => formatDate(getValue()),
    }),
    columnHelper.display({
      id: 'returnItem',
      header: '返却',
      size: 50,
      cell: (info) => (
        <input type="checkbox"
          checked={info.row.original.returnItem}
          disabled={info.row.original.status === "RETURNED"}
          onChange={(e) => {
            const { rentalId, status } = info.row.original;

            // チェックボックスを無効化
            if (status === 'RETURNED') return;

            // Table 表示用の状態更新
            setTableData((prev) =>
              prev.map((row) =>
                row.rentalId === rentalId
                  ? { ...row, returnItem: e.target.checked }
                  : row
              )
            );

            // Context への反映
            if (e.target.checked) addToReturnItem(info.row.original);
            else removeFromItem(rentalId);
          }}
        />
      ),
      enableSorting: false,
    }),
  ]

  useEffect(() => {
    // history が 0 件ならテーブルを空にする
    if (history.length === 0) {
      setTableData([]);
      return;
    }

    // history がある場合は mapping
    if (history.length > 0) {
      setTableData(
        history.map((h) => ({
          ...h,
          returnItem: returnItems.some((returnItems) => returnItems.rentalId === h.rentalId),
        }))
      );
    }
  }, [history, returnItems]);

  const handleRowClick = (rentalId: string) => {
    navigateToDetail(rentalId);
  };

  if (tableData.length === 0) return <div>データがありません。</div>;

  return (
    <div className={styles.rentalHistoryTableView}>
      <BaseTable<RentalHistoryColumn>
        data={tableData}
        columns={columns}
        totalPages={totalPages}
        onSort={(field, direction) => {
          // actions 列は無視
          if (field === 'returnItem') return;

          updateQueryParams(prev => ({
            ...prev,
            sortField: field,
            sortDirection: direction,
            page: 0,
          }))
        }}
      />
    </div>
  );
}
