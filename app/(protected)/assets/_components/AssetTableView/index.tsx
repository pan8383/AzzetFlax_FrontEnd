'use client';

import styles from './AssetTableView.module.css';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { BaseTable } from '@/components/common/BaseTable';
import { AssetsQueryParams } from '@/components/hooks/useAssets';
import { Asset } from '@/types/api/api';
import { CartItem } from '@/contexts/RentalCartContext';

type Props = {
  assets: Asset[];
  addToCart: (asset: Asset) => void;
  cartItems: CartItem[];
  updateQueryParams: (updater: (prev: AssetsQueryParams) => AssetsQueryParams) => void;
  sortField: keyof Asset;
  sortDirection: 'asc' | 'desc';
  totalPages?: number;
}

type AssetTableColumn = Asset & {
  actions?: React.ReactNode
}

export default function AssetTableView({
  assets,
  addToCart,
  cartItems,
  updateQueryParams,
  sortField,
  sortDirection,
  totalPages,
}: Props) {
  const columnHelper = createColumnHelper<AssetTableColumn>();
  const columns: ColumnDef<AssetTableColumn, any>[] = [
    columnHelper.accessor('name', {
      header: '名前',
      enableSorting: true,
      cell: info => <i>{info.getValue()}</i>
    }),
    columnHelper.accessor('categoryName', {
      header: 'カテゴリー',
      enableSorting: false,
      cell: info => info.renderValue()
    }),
    columnHelper.accessor('model', {
      header: '型番',
      enableSorting: true
    }),
    columnHelper.accessor('manufacturer', {
      header: 'メーカー',
      enableSorting: true
    }),
    columnHelper.accessor('isAvailable', {
      header: '利用可能',
      enableSorting: false,
      size: 50,
      cell: info => info.getValue() ? '○' : '×'
    }),
    columnHelper.accessor('totalStock', {
      header: '在庫',
      enableSorting: false,
      size: 50
    }),
    columnHelper.accessor('availableStock', {
      header: '残り',
      enableSorting: false,
      size: 50
    }),
    columnHelper.display({
      id: 'actions',
      header: '操作',
      enableSorting: false,
      size: 80,
      cell: (info) => (
        <button
          className={styles.cartAddButton}
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
    }),
  ];

  if (assets.length === 0) return <div>データがありません。</div>;

  return (
    <BaseTable<AssetTableColumn>
      data={assets}
      columns={columns}
      totalPages={totalPages}
      initialSorting={[{ id: sortField, desc: sortDirection === 'desc' }]}
      onSort={(field, direction) => {
        if (field === 'actions') return;
        updateQueryParams(prev => ({
          ...prev,
          sortField: field,
          sortDirection: direction,
          page: 0,
        }));
      }}
    />
  );
}
