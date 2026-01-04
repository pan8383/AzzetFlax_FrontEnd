'use client';

import { BaseTable } from '@/components/common/BaseTable';
import styles from './RentalResultTableView.module.css';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { RentalCreateResult } from '@/types/api/api';
import { flattenRentalResults } from '@/utils/flattenRentalResults';

export type RentalCreateResultRow = {
  rentalId: string | null;
  assetId: string;
  unitId: string;
  success: boolean;
  errorMessage: string;
};

type Props = {
  datas: RentalCreateResult | null;
};

export default function RentalResultTableView({ datas }: Props) {
  if (!datas) return <div>データがありません。</div>;

  const rows: RentalCreateResultRow[] = flattenRentalResults(datas);

  const columnHelper = createColumnHelper<RentalCreateResultRow>();

  const columns: ColumnDef<RentalCreateResultRow, any>[] = [
    columnHelper.accessor('rentalId', {
      header: 'レンタルID',
    }),
    columnHelper.accessor('assetId', {
      header: '資産ID',
    }),
    columnHelper.accessor('unitId', {
      header: 'ユニットID',
    }),
    columnHelper.accessor('success', {
      header: '結果',
      cell: info => (
        <span style={{ color: info.getValue() ? 'green' : 'red' }}>
          {info.getValue() ? '成功' : '失敗'}
        </span>
      ),
    }),
    columnHelper.accessor('errorMessage', {
      header: 'エラーメッセージ',
      cell: info => info.getValue() || '-',
    }),
  ];

  return (
    <div className={styles.layout}>
      <BaseTable<RentalCreateResultRow>
        data={rows}
        columns={columns}
      />
    </div>
  );
}
