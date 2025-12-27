'use client';

import styles from './page.module.css';
import { useState } from 'react';
import AssetTableView from './_components/AssetTableView';
import TableTitleButton from '@/components/common/TableTitleButton';
import Grid2x2Icon from '@/icons/Grid2x2Icon';
import CategorySelect from '@/components/common/CategorySelect';
import SearchBar from '@/components/common/SearchBar';
import { useCart } from '@/contexts/RentalCartContext';
import { useAssets } from '@/components/hooks/useAssets';
import Pagination from '@/components/common/Pagination/Pagination';

export default function AssetsPage() {
  const [keyword, setKeyword] = useState('');
  const [categoryCode, setCategoryCode] = useState('');
  const { cartItems, addToCart } = useCart();
  const { assets, pageInfo, loading, fetchError, updateQueryParams } = useAssets(50);

  // 検索ボタン押下時
  const handleSearch = () => {
    updateQueryParams(prev => ({
      ...prev,
      search: keyword,
      categoryCode: categoryCode,
      page: 0,
    }));
  };

  if (loading) return <div>読み込み中...</div>;
  if (fetchError) return <div>データ取得エラー...</div>;

  return (
    <div className={styles.pageContainer}>
      {/* タイトル */}
      <TableTitleButton
        label="資産リスト"
        icon={<Grid2x2Icon stroke="var(--primary)" />}
        disabled
      />

      {/* フィルタ */}
      <div className={styles.filters}>
        <CategorySelect value={categoryCode} onCategoryChange={setCategoryCode} />
        <SearchBar value={keyword} onChange={setKeyword} onSearch={handleSearch} />
      </div>

      <p>{pageInfo.totalElements} 件</p>

      {/* テーブル */}
      <AssetTableView
        assets={assets}
        addToCart={addToCart}
        cartItems={cartItems}
        updateQueryParams={updateQueryParams}
      />

      {/* ページネーション */}
      <Pagination
        currentPage={pageInfo.page + 1}
        totalPages={pageInfo.totalPages}
        onPageChange={(page) => updateQueryParams((prev) => ({ ...prev, page: page - 1 }))}
      />
    </div>
  );
}
