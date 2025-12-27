'use client';

import styles from './loginForm.module.css';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Loader from '@/components/common/Loader';
import { useForgotPasswordPath, useLoginApiPath, useLoginPath, useNavigateHome } from '@/components/hooks/useNavigation';
import { useForm } from 'react-hook-form';
import BaseButton from '@/components/common/BaseButton';
import { postApi } from '@/lib/postApi';
import Link from 'next/link';
import { AuthUser } from '@/types/api/api';


type LoginFormValues = {
	email: string;
	password: string;
};

export default function LoginForm() {
	const LOGIN_API_PATH = useLoginApiPath();
	const navigateHome = useNavigateHome();
	const { login } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>();

	const FORGOT_PASSWORD_PATH = useForgotPasswordPath();

	const onSubmit = async (formData: LoginFormValues) => {
		setLoading(true);
		setError('');
		try {
			const res = await postApi<AuthUser, LoginFormValues>(LOGIN_API_PATH, formData);

			if (!res.success) {
				setError(res.error.message);
				return;
			}

			login(res.data);

			// ホーム画面に遷移
			navigateHome();

		} catch (err: any) {
			const message = err.response?.data?.error?.message;
			setError(message || '認証に失敗しました');
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{loading ? <Loader /> :
				<>
					<form className={styles.form}
						onSubmit={handleSubmit(onSubmit)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') e.preventDefault();
						}}>

						<h2 className={styles.loginFormTitle}>ログイン</h2>

						{/* レスポンスメッセージ */}
						{error && <p className={styles.error_message}>{error}</p>}

						<div className={styles.formGroup}>
							<input className={styles.inputGroup}
								type="text"
								id="email"
								placeholder="メールアドレス"
								required
								{...register("email")}
							/>
							{errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
						</div>

						<div className={styles.formGroup}>
							<input className={styles.inputGroup}
								type="password"
								id="password"
								placeholder="パスワード"
								required
								{...register("password")}
							/>
							{errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
						</div>

						{/* パスワード変更ボタン */}
						<Link className={styles.forgotPasswordLink} href={FORGOT_PASSWORD_PATH}>パスワードを忘れた方はこちら</Link>

						{/* 送信ボタン */}
						<BaseButton className={styles.submitBtn} label="ログイン" type='submit' variant="dark" size="sm" disabled={loading} />
					</form>
				</>
			}
		</>
	);
}
