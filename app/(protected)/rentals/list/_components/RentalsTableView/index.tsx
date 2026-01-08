'use client';

import styles from './RentalsTableView.module.css';
import { useNavigateRentalListDetail } from '@/components/hooks/useNavigation';
import { BaseTable } from '@/components/common/BaseTable';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { formatDate } from '@/utils/formatDate';
import { useEffect, useState } from 'react';
import { useRentalReturn } from '@/contexts/RentalReturnContext';
import { RentalAssetsList } from '@/types/api/api';
import { RentalListQueryParams } from '@/components/hooks/useRentalList';
import { RentalStatus, rentalStatusLabelMap } from '@/types/RentalStatus';

type Props = {
  rentals: RentalAssetsList[] | [];
  updateQueryParams: (updater: (prev: RentalListQueryParams) => RentalListQueryParams) => void;
  sortField: keyof RentalAssetsList;
  sortDirection: 'asc' | 'desc';
  totalPages?: number;
};

export type RentalAssetsListColumn = RentalAssetsList;

export default function RentalsTableView({ rentals, totalPages, updateQueryParams }: Props) {
  const navigateRentalListDetail = useNavigateRentalListDetail();
  const [tableData, setTableData] = useState<RentalAssetsListColumn[]>([]);
  const { returnItems, addToReturnItem, removeFromItem } = useRentalReturn();

  const columnHelper = createColumnHelper<RentalAssetsListColumn>();
  const columns: ColumnDef<RentalAssetsListColumn, any>[] = [
    columnHelper.accessor('rentalId', {
      header: 'レンタルID',
      enableSorting: true,
      cell: info => <i>{info.getValue()}</i>,
    }),
    columnHelper.accessor('rentalDate', {
      header: 'レンタル日',
      enableSorting: true,
      cell: ({ getValue }) => formatDate(getValue()),
    }),
    columnHelper.accessor('expectedReturnDate', {
      header: '返却予定日',
      enableSorting: true,
      cell: ({ getValue }) => formatDate(getValue()),
    }),
    columnHelper.accessor('actualReturnDate', {
      header: '返却完了日',
      enableSorting: true,
      cell: ({ getValue }) => formatDate(getValue()),
    }),
    columnHelper.accessor('status', {
      header: 'ステータス',
      enableSorting: true,
      cell: ({ getValue }) => {
        const status = getValue() as RentalStatus;

        return (
          <span
            className={
              status === 'RETURNED'
                ? styles.returned
                : status === 'PARTIAL'
                  ? styles.partial
                  : styles.rented
            }
          >
            {rentalStatusLabelMap[status]}
          </span>
        );
      }
    }),
    columnHelper.accessor('remarks', {
      header: '備考',
      enableSorting: false,
      minSize: 500,
      cell: info => <i>{info.getValue()}</i>,
    }),
  ]

  useEffect(() => {
    // rentals が 0 件ならテーブルを空にする
    if (rentals.length === 0) {
      setTableData([]);
      return;
    }

    // rentals がある場合は mapping
    if (rentals.length > 0) {
      setTableData(
        rentals.map((h) => ({
          ...h,
          returnItem: returnItems.some((returnItems) => returnItems.rentalId === h.rentalId),
        }))
      );
    }
  }, [rentals, returnItems]);

  const handleRowClick = (rental: RentalAssetsListColumn) => {
    navigateRentalListDetail(rental.rentalId)
  };

  if (tableData.length === 0) return <div>データがありません。</div>;

  return (
    <div className={styles.rentalrentalsTableView}>
      <BaseTable<RentalAssetsListColumn>
        data={tableData}
        columns={columns}
        totalPages={totalPages}
        onSort={(field, direction) => {
          updateQueryParams(prev => ({
            ...prev,
            sortField: field,
            sortDirection: direction,
            page: 0,
          }))
        }}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
