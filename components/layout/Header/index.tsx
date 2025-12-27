'use client';

import styles from './Header.module.css';
import { useNavigateHome } from '@/components/hooks/useNavigation';
import { NavigationMenus } from './_components/SubNavigation';
import { useAuth } from '@/contexts/AuthContext';
import UtilityNavigation from './_components/UtilityNavigation';

export default function Header() {
	const { user } = useAuth();
	const navigateHome = useNavigateHome();
	const handleHome = () => navigateHome();
	return (
		<header className={styles.site_header}>
			{/* タイトル */}
			<h1 onClick={handleHome} className={styles.title} >
				Azzet Flux
			</h1>

			{/* ユーティリティナビゲーション */}
			<div className={styles.sub_nav_wrapper}>
				<UtilityNavigation />
			</div>

			{/* メインナビゲーション / 未ログイン時は非表示*/}
			{user && (
				<div className={styles.main_nav_wrapper}>
					<NavigationMenus />
				</div>
			)}
		</header>
	);
}
