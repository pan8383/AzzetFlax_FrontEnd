'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import axiosInstance from '@/lib/axiosInstance';
import styles from './loginForm.module.css';
import Loader from '@/components/common/Loader';
import { useLoginPath, useNavigateHome } from '@/components/hooks/useNavigation';
import { useForm } from 'react-hook-form';
import BaseButton from '@/components/common/BaseButton';

/**
 * APIリクエストパラメータ（ログイン）
 */
type LoginParams = {
	email: string;
	password: string;
};

export default function LoginForm() {
	const loginPath = useLoginPath();
	const navigateHome = useNavigateHome();
	const { setUser } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LoginParams>();

	const onSubmit = async (formData: LoginParams) => {
		setLoading(true);
		setError('');
		try {
			const res = await axiosInstance.post(loginPath, formData);

			// ブラウザに保存
			localStorage.setItem('user', JSON.stringify(res.data.data));

			// Context に反映
			setUser(res.data.data);

			// フォームリセット
			reset();

			// ホーム画面に遷移
			navigateHome();

		} catch (err: any) {
			const apiError = err.response?.data?.error;
			setError(apiError?.message || '認証に失敗しました');
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{loading ? <Loader /> : 'ログイン'}
			<div className={styles.login_wrapper}>
				<div className={styles.login_container}>
					<h1>Azzetにログイン</h1>

					<form className={styles.login_form}
						onSubmit={handleSubmit(onSubmit)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') e.preventDefault();
						}}>

						{/* レスポンスメッセージ */}
						{error && <p className={styles.error_message}>{error}</p>}

						<div>
							<input className={styles.login_input}
								type="text"
								id="email"
								placeholder="メールアドレス"
								required
								{...register("email")}
							/>
							{errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
						</div>

						<div>
							<input className={styles.login_input}
								type="password"
								id="password"
								placeholder="パスワード"
								required
								{...register("password")}
							/>
							{errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
						</div>
						{/* TODO ここどうにかする */}
						<a href="/">パスワードを忘れた場合</a>

						{/* 送信ボタン */}
						<BaseButton label="確定" type='submit' variant="dark" size="sm" disabled={loading} />
					</form>
				</div>
			</div>
		</>
	);
}
