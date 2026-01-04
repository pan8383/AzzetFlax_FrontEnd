'use client';

import styles from './page.module.css';
import TableTitleButton from '@/components/common/TableTitleButton';
import CrownIcon from '@/icons/CrownIcon';
import AssetCreateForm from './_components/AssetCreateForm/AssetCreateForm';
import AssetTableView from './_components/AssetTableView';
import { useAssets } from '@/components/hooks/useAssets';
import Loader from '@/components/common/Loader';
import CategorySelect from '@/components/common/CategorySelect';
import SearchBar from '@/components/common/SearchBar';
import Pagination from '@/components/common/Pagination/Pagination';
import { useState } from 'react';
import ReloadButton from '@/components/common/ReloadButton';
import { useBreadcrumbs } from '@/components/hooks/useBreadcrumbs';
import { ADMIN_ASSET_LIST } from '@/components/ui/Breadcrumbs/breadcrumbs';

export default function Page() {
	const [keyword, setKeyword] = useState('');
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [categoryCode, setCategoryCode] = useState('');
	const { assets, pageInfo, loading, fetchError, updateQueryParams, refetch } = useAssets(20);

	// パンくずリスト
	useBreadcrumbs(ADMIN_ASSET_LIST);

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
		<div className={styles.pageLayout}>
			{/* タイトル */}
			<TableTitleButton
				label="アセット管理"
				icon={<CrownIcon stroke="var(--primary)" />}
				disabled
			/>

			<div className={styles.form}>
				<AssetCreateForm
					isOpen={isOpen}
					onToggle={() => setIsOpen(prev => !prev)}
				/>
			</div>

			<hr />


			<div className={styles.assetTable}>
				<h3 className={styles.assetListTitle}>アセットリスト</h3>

				{/* フィルタ */}
				<div className={styles.filters}>
					{/* カテゴリセレクター */}
					<CategorySelect value={categoryCode} onCategoryChange={setCategoryCode} />
					{/* 検索バー */}
					<SearchBar value={keyword} onChange={setKeyword} onSearch={handleSearch} />
					{/* リロードボタン */}
					<ReloadButton onClick={refetch} />
				</div>

				<p>{pageInfo.totalElements} 件</p>

				{/* テーブル */}
				{loading ? <Loader /> : (
					<AssetTableView assets={assets} updateQueryParams={updateQueryParams} onDeleted={refetch} />
				)}
				{/* ページネーション */}
				<Pagination
					currentPage={pageInfo.page + 1}
					totalPages={pageInfo.totalPages}
					onPageChange={(page) => updateQueryParams((prev) => ({ ...prev, page: page - 1 }))}
				/>
			</div>
		</div>
	);
}
