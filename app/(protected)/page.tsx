'use client';

import styles from './page.module.css';
import { useBreadcrumbs } from '@/components/hooks/useBreadcrumbs';
import TableTitleButton from '@/components/common/TableTitleButton';
import Grid2x2Icon from '@/icons/Grid2x2Icon';
import CategorySelect from '@/components/common/CategorySelect';
import SearchBar from '@/components/common/SearchBar';
import AssetTableView from './assets/_components/AssetTableView';
import Pagination from '@/components/common/Pagination/Pagination';
import { useState } from 'react';
import { useCart } from '@/contexts/RentalCartContext';
import { useAssets } from '@/components/hooks/useAssets';

export default function Page() {
  const [keyword, setKeyword] = useState('');
  const [categoryCode, setCategoryCode] = useState('');
  const { cartItems, addToCart } = useCart();
  const { assets, pageInfo, loading, fetchError, updateQueryParams, searchParams } = useAssets(20);

  // パンくずリスト
  useBreadcrumbs();

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
    <>
      {/* タイトル */}
      <TableTitleButton
        label="レンタル"
        icon={<Grid2x2Icon stroke="var(--primary)" />}
        disabled
      />

      {/* フィルタ */}
      <div className={styles.filters}>
        <div className={styles.categorySelectorWrapper}>
          <CategorySelect value={categoryCode} onCategoryChange={setCategoryCode} />
        </div>
        <SearchBar value={keyword} onChange={setKeyword} onSearch={handleSearch} />
      </div>

      <p>{pageInfo.totalElements} 件</p>

      <div className={styles.listWrapper}>
        {/* テーブル */}
        <AssetTableView
          assets={assets}
          addToCart={addToCart}
          cartItems={cartItems}
          updateQueryParams={updateQueryParams}
          sortField={searchParams.sortField}
          sortDirection={searchParams.sortDirection}
          totalPages={pageInfo.totalPages}
        />

        {/* ページネーション */}
        <Pagination
          currentPage={pageInfo.page + 1}
          totalPages={pageInfo.totalPages}
          onPageChange={(page) => updateQueryParams((prev) => ({ ...prev, page: page - 1 }))}
        />
      </div>
    </>
  );
}