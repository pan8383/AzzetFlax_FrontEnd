'use client';

import styles from './page.module.css';
import TableTitleButton from '@/components/common/TableTitleButton';
import CrownIcon from '@/icons/CrownIcon';
import { useStore } from '@/lib/store';
import AssetUnitUpdateForm from './_components/AssetUnitUpdateForm/AssetUnitUpdateForm';
import { useMemo } from 'react';
import { useBreadcrumbs } from '@/components/hooks/useBreadcrumbs';
import { ADMIN_ASSET_UNIT_DETAIL } from '@/components/ui/Breadcrumbs/breadcrumbs';

export default function Page() {
	const selectedUnit = useStore((state) => state.selectedUnit);

	const breadcrumbs = useMemo(() => {
		if (!selectedUnit) return [];

		return ADMIN_ASSET_UNIT_DETAIL(
			selectedUnit.assetId,
			selectedUnit.unitId
		);
	}, [selectedUnit?.assetId, selectedUnit?.unitId]);

	// パンくずリスト
	useBreadcrumbs(breadcrumbs);

	if (!selectedUnit) return null;

	return (
		<div className={styles.pageLayout}>
			{/* タイトル */}
			<TableTitleButton
				label="ユニット管理"
				icon={<CrownIcon stroke="var(--primary)" />}
				disabled
			/>

			<div className={styles.form}>
				<AssetUnitUpdateForm data={selectedUnit} />
			</div>
		</div>
	);
}
