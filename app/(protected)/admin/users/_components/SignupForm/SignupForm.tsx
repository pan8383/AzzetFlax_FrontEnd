'use client';

import styles from './SignupForm.module.css';
import BaseButton from '@/components/common/BaseButton';
import { postApi } from '@/lib/postApi';
import { UserCreateResponse } from '@/types/api/api';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PlusIcon from '@/icons/PlusIcon';
import { getSignupApiPath } from '@/components/hooks/useNavigation';

type UserCreateFormValues = {
	name: string;
	email: string;
	password: string;
	role: string;
};

export default function SignupForm({ refreshUsers }: { refreshUsers: () => void }) {
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	const SIGNUP_API_PATH = getSignupApiPath();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserCreateFormValues>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			role: 'GUEST',
		},
	});

	const onSubmit = async (data: UserCreateFormValues) => {
		setError('');
		setSuccess('');

		try {
			await postApi<UserCreateResponse, UserCreateFormValues>(SIGNUP_API_PATH, data);
			setSuccess('ユーザーを登録しました。');
			refreshUsers();
		} catch (err: any) {
			setError(err.response?.data?.error?.message || 'サーバエラーが発生しました');
		}
	};

	return (
		<div className={styles.signupFormWrapper}>
			<h3
				className={styles.toggleHeader}
				onClick={() => setIsOpen(prev => !prev)}
			>
				新規ユーザー登録 {isOpen ? '▲' : '▼'}
			</h3>
			<form
				className={`${styles.form} ${!isOpen ? styles.hidden : ''}`}
				onSubmit={handleSubmit(onSubmit)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') e.preventDefault();
				}}
			>
				<div className={styles.inputGroup}>
					<label className={styles.inputLabel} htmlFor="name">ユーザー名*</label>
					<input
						className={styles.input}
						type="text"
						id="name"
						{...register('name', {
							required: 'ユーザー名は必須です',
							minLength: { value: 5, message: '5文字以上で入力してください' },
							maxLength: { value: 50, message: '50文字以内で入力してください' },
							pattern: {
								value: /^[A-Za-z0-9!@#$%^&*()_+=\-]+$/,
								message: '使用できるのは半角英数字と ! @ # $ % ^ & * ( ) _ + - のみです',
							},
						})}
					/>
					<p className={styles.inputHelp}>5~50文字以内で入力してください。<br />
						使用できるのは半角英数字と以下の記号です。<br />
						! @ # $ % ^ &amp; * ( ) _ + - が使用できます。
					</p>
					{errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
				</div>

				<div className={styles.inputGroup}>
					<label className={styles.inputLabel} htmlFor="email">メールアドレス*</label>
					<input
						className={styles.input}
						type="email"
						id="email"
						{...register('email', {
							required: 'メールアドレスは必須です',
							minLength: { value: 2, message: '2文字以上で入力してください' },
							maxLength: { value: 254, message: '50文字以内で入力してください' },
							pattern: {
								value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
								message: 'メールアドレスで使用できない文字が含まれています',
							},
						})}
					/>
					{errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
				</div>

				<div className={styles.inputGroup}>
					<label className={styles.inputLabel} htmlFor="password">パスワード*</label>
					<input
						className={styles.input}
						type="password"
						id="password"
						{...register('password', {
							required: 'パスワードは必須です',
							minLength: { value: 8, message: '8文字以上で入力してください' },
							maxLength: { value: 50, message: '50文字以内で入力してください' },
							pattern: {
								value: /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]+$/,
								message: '使用できない文字が含まれています',
							},
						})}
					/>
					<p className={styles.inputHelp}>8~50文字以内で入力してください。<br />
						使用できるのは半角英数字と以下の記号です。<br />：! @ # $ % ^ &amp; * ( ) _ + - = [ ] &#123; &#125; ; ' : " \ | , . &lt; &gt; / ? ` ~
					</p>
					{errors.password && (<p style={{ color: 'red' }}>{errors.password.message}</p>)}
				</div>

				<div className={styles.inputGroup}>
					<label className={styles.inputLabel} htmlFor="role">ロール*</label>
					<select
						className={styles.input}
						id="role"
						{...register('role')}>
						<option value="ADMIN">管理者</option>
						<option value="STAFF">スタッフ</option>
						<option value="MEMBER">一般ユーザー</option>
						<option value="VIEWER">閲覧者</option>
						<option value="GUEST">ゲスト</option>
					</select>
				</div>

				{/* 成功 */}
				{success && <p style={{ color: 'green' }}>{success}</p>}

				{/* サーバエラー */}
				{error && <p style={{ color: 'red' }}>{error}</p>}

				<BaseButton
					className={styles.submitButton}
					type='submit'
					icon={<PlusIcon />}
					label='登録'
				/>
			</form>
		</div>
	);
}
