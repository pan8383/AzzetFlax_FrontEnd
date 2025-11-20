'use client';

import BaseTable, { Column } from '@/components/common/BaseTable';
import { AssetStockSummaryView } from '@/types/assets';
import styles from './AssetTableView.module.css';
import ShoppingCartIcon from '@/icons/ShoppingCartIcon';
import { RentalRegisterResult } from '@/types/ApiResponse';

type Props = {
  datas: RentalRegisterResult[];
}

export default function RentalResultTableView({ datas }: Props) {
  const columns: Column<RentalRegisterResult>[] = [
    { key: 'rentalId', label: 'レンタルID', sortable: true },
    { key: 'assetId', label: '資産ID', sortable: true },
    { key: 'success', label: '結果', sortable: true },
    { key: 'errorMessage', label: 'メッセージ', sortable: true },
  ];

  if (datas.length === 0) return <div>データがありません。</div>;

  return (
    <div className={styles.layout}>
      <BaseTable<RentalRegisterResult>
        data={datas}
        columns={columns}
      />
    </div>
  );
}
