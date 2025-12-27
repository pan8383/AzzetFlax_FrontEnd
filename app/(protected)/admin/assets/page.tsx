'use client';

import TableTitleButton from '@/components/common/TableTitleButton';
import styles from './page.module.css';
import CrownIcon from '@/icons/CrownIcon';

export default function Home() {
	return (
		<div className={styles.pageLayout}>
			{/* タイトル */}
			<TableTitleButton
				label="アセット管理"
				icon={<CrownIcon stroke="var(--primary)" />}
				disabled
			/>
		</div>
	);
}
