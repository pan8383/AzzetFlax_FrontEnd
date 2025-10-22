'use client';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';
import axiosInstance from '@/lib/axiosInstance';
import { useState } from 'react';

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
				<h1 onClick={handleHome} className={styles.logo}>
					Azzet
				</h1>
				<nav className={styles.nav}>
					{users ? (
						<>
							<span>ようこそ、{users.displayName}さん</span>
							<button onClick={handleLogout}>ログアウト</button>
						</>
					) : (
						<div>
							<button onClick={handleLogin}>ログイン</button>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
}
