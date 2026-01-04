'use client';

import styles from './RentalListDetailTableView.module.css';
import { useNavigateRentalListDetail } from '@/components/hooks/useNavigation';
import { BaseTable } from '@/components/common/BaseTable';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { formatDate } from '@/utils/formatDate';
import { useEffect, useState } from 'react';
import { useRentalReturn } from '@/contexts/RentalReturnContext';
import { RentalAssetsList, RentalDetail, RentalUnitStatus } from '@/types/api/api';
import { RentalListQueryParams } from '@/components/hooks/useRentalList';
import { RentalStatus, rentalStatusLabelMap, rentalUnitStatusLabelMap } from '@/types/RentalStatus';

type Props = {
  rentalId: string;
  rentalDetails: RentalDetail[] | [];
};

export type RentalDetailListColumn = RentalDetail & {
  returnItem: boolean;
}


export default function RentalListDetailTableView({ rentalId, rentalDetails }: Props) {
  const [tableData, setTableData] = useState<RentalDetailListColumn[]>([]);
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

  const columnHelper = createColumnHelper<RentalDetailListColumn>();
  const columns: ColumnDef<RentalDetailListColumn, any>[] = [
    columnHelper.accessor('unitId', {
      header: 'ユニットID',
      enableSorting: false,
      cell: info => <i>{info.getValue()}</i>
    }),
    columnHelper.accessor('name', {
      header: '名前',
      enableSorting: false,
      cell: info => <i>{info.getValue()}</i>
    }),
    columnHelper.accessor('serialNumber', {
      header: 'シリアルナンバー',
      enableSorting: false
    }),
    columnHelper.accessor('categoryName', {
      header: 'カテゴリー',
      enableSorting: false,
      cell: info => info.renderValue()
    }),
    columnHelper.accessor('model', {
      header: '型番',
      enableSorting: false
    }),
    columnHelper.accessor('manufacturer', {
      header: 'メーカー',
      enableSorting: false
    }),


    columnHelper.accessor('rentalUnitStatus', {
      header: 'ステータス',
      enableSorting: false,
      size: 100,
      cell: ({ getValue }) => {
        const status = getValue() as RentalUnitStatus;

        return (
          <span
            className={
              status === 'RETURNED'
                ? styles.returned
                : status === 'RENTING'
                  ? styles.renting
                  : styles.cancelled
            }
          >
            {rentalUnitStatusLabelMap[status]}
          </span>
        );
      }
    }),
    columnHelper.accessor('returnedAt', {
      header: '返却日',
      enableSorting: false,
      size: 100,
      cell: ({ getValue }) => formatDate(getValue()),
    }),
    columnHelper.display({
      id: 'returnItem',
      header: '返却',
      enableSorting: false,
      size: 40,
      cell: (info) => {
        const { rentalUnitId, rentalUnitStatus, returnItem } = info.row.original;

        const isReturned = rentalUnitStatus === 'RETURNED';

        return (
          <input
            type="checkbox"
            checked={returnItem}
            disabled={isReturned}
            onChange={(e) => {
              if (isReturned) return;

              // Table表示用 state 更新
              setTableData(prev =>
                prev.map(row =>
                  row.rentalUnitId === rentalUnitId
                    ? { ...row, returnItem: e.target.checked }
                    : row
                )
              );

              // Context 更新
              if (e.target.checked) {
                addToReturnItem(rentalId, info.row.original.rentalUnitId);
              } else {
                removeFromItem(rentalId, rentalUnitId);
              }
            }}
          />
        );
      },
    }),
  ];

  const handleRowClick = (row: RentalDetailListColumn) => {
    if (row.rentalUnitStatus === 'RETURNED') return;

    const nextChecked = !row.returnItem;

    // table 表示用 state
    setTableData(prev =>
      prev.map(r =>
        r.rentalUnitId === row.rentalUnitId
          ? { ...r, returnItem: nextChecked }
          : r
      )
    );

    // Context 同期
    if (nextChecked) {
      addToReturnItem(rentalId, row.rentalUnitId);
    } else {
      removeFromItem(rentalId, row.rentalUnitId);
    }
  };
  useEffect(() => {
    setTableData(
      rentalDetails.map(detail => ({
        ...detail,
        returnItem: false,
      }))
    );
  }, [rentalDetails]);

  if (rentalDetails.length === 0) return <div>データがありません。</div>;

  return (
    <>
      <BaseTable<RentalDetailListColumn>
        data={tableData}
        columns={columns}
        onRowClick={handleRowClick}
      />
    </>
  );
}
