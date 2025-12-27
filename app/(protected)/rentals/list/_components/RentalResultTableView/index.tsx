'use client';

import { BaseTable } from '@/components/common/BaseTable';
import styles from './RentalResultTableView.module.css';
import { RentalCreateResult } from '@/types/api/api';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

type Props = {
  datas: RentalCreateResult[];
}

export default function RentalResultTableView({ datas }: Props) {
  const columnHelper = createColumnHelper<RentalCreateResult>();
  const columns: ColumnDef<RentalCreateResult, any>[] = [
    columnHelper.accessor('rentalId', {
      header: 'レンタルID',
      cell: (info) => <i>{info.getValue()}</i>,
      enableSorting: false,
    }),
    columnHelper.accessor('assetId', {
      header: '資産ID',
      enableSorting: false,
    }),
    columnHelper.accessor('message', {
      header: 'メッセージ',
      size: 50,
      enableSorting: false,
    }),

  ];
  if (datas.length === 0) return <div>データがありません。</div>;

  return (
    <div className={styles.layout}>

      {/* リザルトページ */}
      <BaseTable<RentalCreateResult>
        data={datas}
        columns={columns}
      />
    </div>
  );
}
