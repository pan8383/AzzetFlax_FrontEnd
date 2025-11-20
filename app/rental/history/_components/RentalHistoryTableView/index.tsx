'use client';

import BaseTable, { Column } from '@/components/common/BaseTable';
import styles from './RentalHistoryTableView.module.css';
import { RentalHistory } from '@/components/hooks/useRentalHistory';

type Props = {
  histories: RentalHistory[] | [];
};

export default function RentalHistoryTableView({ histories }: Props) {
  const columns: Column<RentalHistory>[] = [
    { key: 'rentalId', label: 'レンタルID' },
    { key: 'unitId', label: 'ユニットID' },
    { key: 'statusCode', label: 'ステータスコード' },
    { key: 'due', label: '期限' },
    { key: 'returnAt', label: '返却日' },
    { key: 'createdAt', label: 'レンタル日' },
  ];

  if (histories.length === 0) return <div>データがありません。</div>;

  return (
    <div className={styles.layout}>
      <BaseTable<RentalHistory>
        data={histories.map((history) => ({
          ...history
        }))}
        columns={columns}
      />
    </div>
  );
}
