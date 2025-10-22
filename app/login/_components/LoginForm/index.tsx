'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import axiosInstance from '@/lib/axiosInstance';
import styles from './loginForm.module.css';
import Loader from '@/components/common/Loader';

type LoginFormData = {
	email: string;
	password: string;
};

export default function LoginForm() {
	const router = useRouter();
	const { setUser } = useAuth();
	const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true); // ローディング開始
		setError('');
		try {
			const res = await axiosInstance.post('/login', formData);

			// ブラウザに保存
			localStorage.setItem('user', JSON.stringify(res.data.data));

			// Context に反映
			setUser(res.data.data);

			router.push('/');
		} catch (err: any) {
			const apiError = err.response?.data?.error;
			setError(apiError?.message || '認証に失敗しました');
		} finally {
			setLoading(false); // ローディング終了
		}
	};

	return (
		<>
			{loading ? <Loader /> : 'ログイン'}
			<div className={styles.login_wrapper}>
				<div className={styles.login_container}>
					<h1>Azzetにログイン</h1>
					<form className={styles.login_form} onSubmit={formSubmit}>
						{error && <p className={styles.error_message}>{error}</p>}

						<input
							className={styles.login_input}
							type="text"
							id="email"
							value={formData.email}
							onChange={(e) => setFormData({ ...formData, email: e.target.value })}
							placeholder="メールアドレス"
							required
						/>
						<input
							className={styles.login_input}
							type="password"
							id="password"
							value={formData.password}
							onChange={(e) => setFormData({ ...formData, password: e.target.value })}
							placeholder="パスワード"
							required
						/>

						<a href="/">パスワードを忘れた場合</a>

						<button type="submit" disabled={loading}>
							ログイン
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
