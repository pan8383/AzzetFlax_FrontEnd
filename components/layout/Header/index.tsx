'use client';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';
import axiosInstance from '@/lib/axiosInstance';
import { useState } from 'react';
import BellDotIcon from '@/icons/BellDotIcon';
import CircleQuestionMarkIcon from '@/icons/CircleQuestionMark';
import SettingsIcon from '@/icons/SettingsIcon';
import CircleUserRoundIcon from '@/icons/CircleUserRoundIcon';
import Link from 'next/link';

export default function Header() {
	const { users, setUser } = useAuth();
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await axiosInstance.post('/logout');
		} catch (e) {
			console.error('ログアウト失敗', e);
		}
		localStorage.removeItem('user');
		setUser(null);
	};
	const handleHome = () => {
		router.push('/');
	};
	const handleLogin = () => {
		router.push('/login');
	};

	return (
		<header className={styles.site_header}>
			<div className={styles.container}>
				<h1 onClick={handleHome} className={styles.title} >
					<Link href="/">
						Azzet Flux
					</Link>
				</h1>
				<nav className={styles.nav}>
					<button className={styles.notify_button}>
						<div className={styles.icon_wrapper}>
							<BellDotIcon stroke="var(--secondary)" strokeWidth={2} size={45} />
						</div>
					</button>
					<button className={styles.notify_button}>
						<div className={styles.icon_wrapper}>
							<CircleQuestionMarkIcon stroke="var(--secondary)" strokeWidth={2} size={45} />
						</div>
					</button>
					<button className={styles.notify_button}>
						<div className={styles.icon_wrapper}>
							<SettingsIcon stroke="var(--secondary)" strokeWidth={2} />
						</div>
					</button>
					<button className={styles.notify_button}>
						<div className={styles.icon_wrapper}>
							<CircleUserRoundIcon stroke="var(--secondary)" strokeWidth={2} />
						</div>
					</button>
				</nav>
			</div>
		</header>
	);
}
