'use client';

import BaseTable, { Column } from '@/components/common/BaseTable';
import { AssetStockSummaryView } from '@/types/assets';
import styles from './AssetTableView.module.css';
import ShoppingCartIcon from '@/icons/ShoppingCartIcon';

type Props = {
  assets: AssetStockSummaryView[];
  addToCart: (asset: AssetStockSummaryView) => void;
  cartItems: CartItem[];
}

type AssetTableRow = AssetStockSummaryView & {
  actions?: React.ReactNode
};

type CartItem = AssetStockSummaryView & {
  quantity: number;
};

export default function AssetTableView({ assets, addToCart, cartItems }: Props) {
  const columns: Column<AssetTableRow>[] = [
    { key: 'assetId', label: 'ID', sortable: true },
    { key: 'name', label: '名前', sortable: true },
    { key: 'categoryName', label: 'カテゴリ', sortable: true },
    { key: 'model', label: 'モデル', sortable: true },
    { key: 'manufacturer', label: 'メーカー', sortable: true },
    { key: 'isAvailable', label: 'ステータス' },
    { key: 'totalStock', label: '在庫' },
    { key: 'availableStock', label: '利用可能' },
    { key: 'actions', label: '操作' },
  ];

  if (assets.length === 0) return <div>データがありません。</div>;

  return (
    <div className={styles.layout}>
      <BaseTable<AssetTableRow>
        data={assets.map((asset) => ({
          ...asset,
          actions: (
            <button
              className={styles.cart}
              onClick={() => addToCart(asset)}
              disabled={
                asset.availableStock === 0 ||
                cartItems.find((item) => item.assetId === asset.assetId)?.quantity === asset.availableStock
              }
            >
              <ShoppingCartIcon size={16} stroke="white" />
              追加
            </button>
          ),
        }))}
        columns={columns}
      />
    </div>
  );
}
