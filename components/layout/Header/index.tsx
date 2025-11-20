'use client';
import { useNavigateHome } from '@/components/hooks/useNavigation';
import styles from './Header.module.css';
import NavigationMenus from './_components/NavigationMenus';
import ModalWindow from '@/components/common/ModalWindow';

export default function Header() {
	const navigateHome = useNavigateHome();
	const handleHome = () => navigateHome();


	return (
		<header className={styles.site_header}>
			<div className={styles.container}>
				{/* タイトル */}
				<h1 onClick={handleHome} className={styles.title} >
					Azzet Flux
				</h1>

				{/* ヘッダーナビゲーション */}
				<NavigationMenus />

			</div>
		</header>
	);
}
