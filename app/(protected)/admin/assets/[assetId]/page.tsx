'use client';

import styles from './page.module.css';
import { useAssetUnits } from '@/components/hooks/useAssetUnits';
import { useParams } from 'next/navigation';
import AssetUnitTableView from './_components/AssetUnitTableView';
import AssetUnitCreateForm from './_components/AssetUnitCreateForm/AssetCreateForm';
import ReloadButton from '@/components/common/ReloadButton';
import TableTitleButton from '@/components/common/TableTitleButton';
import CrownIcon from '@/icons/CrownIcon';
import { useMemo, useState } from 'react';
import { useBreadcrumbs } from '@/components/hooks/useBreadcrumbs';
import { ADMIN_ASSET_DETAIL } from '@/components/ui/Breadcrumbs/breadcrumbs';
import AssetUpdateForm from './_components/AssetUpdateForm/AssetUpdateForm';

export default function Page() {
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const { assetId = '' } = useParams<{ assetId?: string }>();
	const { assetUnits, loading, fetchError, refetch } = useAssetUnits(assetId);
	const asset = assetUnits?.[0];

	const breadcrumbs = useMemo(
		() => (assetId ? ADMIN_ASSET_DETAIL(assetId) : []),
		[assetId]
	);

	// パンくずリスト
	useBreadcrumbs(breadcrumbs);

	if (loading) return <div>読み込み中...</div>;
	if (fetchError) return <div>データ取得エラー...</div>;

	return (
		<div className={styles.pageLayout}>
			<TableTitleButton
				label="ユニット管理"
				icon={<CrownIcon stroke="var(--primary)" />}
				disabled
			/>

			{asset && (
				<AssetUpdateForm
					data={asset}
					onUpdated={refetch}
					isOpen={isCreateOpen}
					onToggle={() => setIsCreateOpen(prev => !prev)}
				/>
			)}

			<div className={styles.form}>
				<AssetUnitCreateForm
					assetId={assetId}
					isOpen={isEditOpen}
					onToggle={() => setIsEditOpen(prev => !prev)}
				/>
			</div>

			<hr />

			<div className={styles.assetUnitTable}>
				<h3 className={styles.assetUnitListTitle}>アセットリスト</h3>
				<ReloadButton onClick={refetch} />
				<AssetUnitTableView assetUnits={assetUnits} onDeleted={refetch} />
			</div>
		</div>
	);
}
