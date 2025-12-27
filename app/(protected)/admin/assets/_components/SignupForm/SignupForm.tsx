'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import axiosInstance from '@/lib/axiosInstance';
import { useUsersRegisterPath } from '@/components/hooks/useNavigation';

export default function SignupForm() {
	const usersRegisterPath = useUsersRegisterPath();
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');

	// useFormの設定
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			displayName: '',
			email: '',
			password: '',
			roleCd: 'R005',
		},
	});

	// 送信処理
	const onSubmit = async (data: any) => {
		try {
			await axiosInstance.post(usersRegisterPath, data);
			setSuccess('ユーザーを登録しました。');
			reset();
		} catch (err) {
			if (err instanceof AxiosError) {
				const apiError = err.response?.data?.error;
				setError(apiError?.message || 'サーバーエラーが発生しました');
			} else {
				setError('サーバーエラーが発生しました');
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h2>新規ユーザー作成</h2>

			<div>
				<label htmlFor="displayName">表示名</label>
				<input
					type="text"
					id="displayName"
					{...register('displayName', { required: '表示名は必須です' })}
				/>
				{errors.displayName && <p style={{ color: 'red' }}>{errors.displayName.message}</p>}
			</div>

			<div>
				<label htmlFor="email">メールアドレス</label>
				<input
					type="email"
					id="email"
					{...register('email', { required: 'メールアドレスは必須です' })}
				/>
				{errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
			</div>

			<div>
				<label htmlFor="password">パスワード</label>
				<input
					type="password"
					id="password"
					{...register('password', { required: 'パスワードは必須です' })}
				/>
				{errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
			</div>

			<div>
				<label htmlFor="role">ロール</label>
				<select id="role" {...register('roleCd')}>
					<option value="R001">管理者</option>
					<option value="R002">スタッフ</option>
					<option value="R003">一般ユーザー</option>
					<option value="R004">閲覧者</option>
					<option value="R005">ゲスト</option>
				</select>
			</div>

			{success && <p style={{ color: 'green' }}>{success}</p>}
			{error && <p style={{ color: 'red' }}>{error}</p>}

			<button type="submit">登録</button>
		</form>
	);
}
