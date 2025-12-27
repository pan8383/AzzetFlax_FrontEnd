'use client';

import styles from './AssetTableView.module.css';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { BaseTable } from '@/components/common/BaseTable';
import { AssetsQueryParams } from '@/components/hooks/useAssets';
import { CartItem } from '@/types/context/RentalCartContextTypes';
import { AssetEntity } from '@/types/api/entities';

type Props = {
  assets: AssetEntity[];
  addToCart: (asset: AssetEntity) => void;
  cartItems: CartItem[];
  updateQueryParams: (updater: (prev: AssetsQueryParams) => AssetsQueryParams) => void;
  totalPages?: number;
}

type AssetTableColumn = AssetEntity & {
  actions?: React.ReactNode
};

export default function AssetTableView({ assets, addToCart, cartItems, updateQueryParams, totalPages }: Props) {
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
      id: 'actions',
      header: '操作',
      size: 80,
      cell: (info) => (
        <button
          className={styles.cartAddBtn}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(info.row.original);
          }}
          disabled={
            info.row.original.availableStock === 0 ||
            cartItems.find((item) => item.assetId === info.row.original.assetId)?.quantity ===
            info.row.original.availableStock
          }
        >
          カートに追加する
        </button>
      ),
      enableSorting: false,
    }),
  ]


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
    />
  );
}
