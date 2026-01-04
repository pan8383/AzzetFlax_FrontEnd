'use client';

import styles from './AssetCreateForm.module.css';
import BaseButton from '@/components/common/BaseButton';
import { postApi } from '@/lib/postApi';
import { AssetCreateResponse } from '@/types/api/api';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PlusIcon from '@/icons/PlusIcon';
import CategorySelect from '@/components/common/CategorySelect';
import { getAssetCreateApiPath } from '@/components/hooks/useNavigation';

type AssetCreateFormValues = {
	name: string;
	categoryCode: string;
	model: string;
	manufacturer: string;
};

type Props = {
	isOpen: boolean;
	onToggle: () => void;
}

export default function AssetCreateForm({ isOpen, onToggle }: Props) {
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');
	const [categoryCode, setCategoryCode] = useState('');
	const ASSET_CREATE_API_PATH = getAssetCreateApiPath();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<AssetCreateFormValues>({
		defaultValues: {
			name: '',
			categoryCode: '',
			model: '',
			manufacturer: '',
		},
	});

	const onSubmit = async (data: AssetCreateFormValues) => {
		setError('');
		setSuccess('');

		try {
			await postApi<AssetCreateResponse, AssetCreateFormValues>(ASSET_CREATE_API_PATH, data);
			setSuccess('アセットを登録しました。');
		} catch (err: any) {
			setError(err.response?.data?.error?.message || 'サーバエラーが発生しました');
		}
	};

	return (
		<div className={styles.signupFormWrapper}>
			<h3
				className={styles.toggleHeader}
				onClick={onToggle}
			>
				新規アセット登録 {isOpen ? '▲' : '▼'}
			</h3>
			<form
				className={`${styles.form} ${!isOpen ? styles.hidden : ''}`}
				onSubmit={handleSubmit(onSubmit)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') e.preventDefault();
				}}
			>
				<div className={styles.inputGroup}>
					<label className={styles.inputLabel} htmlFor="name">名前*</label>
					<input
						className={styles.input}
						type="text"
						id="name"
						placeholder="例）ノートPC"
						{...register('name', {
							required: '名前は必須です',
							minLength: { value: 2, message: '2文字以上で入力してください' },
							maxLength: { value: 100, message: '100文字以内で入力してください' },
						})}
					/>
					<p className={styles.inputHelp}>2~100文字以内で入力してください。</p>
					{errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
				</div>

				<div className={styles.inputGroup}>
					<label className={styles.inputLabel} htmlFor="categoryCode">カテゴリ*</label>
					<CategorySelect
						value={categoryCode}
						onCategoryChange={(code) => {
							setCategoryCode(code);
							setValue('categoryCode', code);
						}}
					/>
				</div>

				<div className={styles.inputGroup}>
					<label className={styles.inputLabel} htmlFor="model">型番*</label>
					<input
						className={styles.input}
						type="text"
						id="model"
						placeholder="例）B0G4P2JLK7"
						{...register('model', {
							required: '型番は必須です',
							minLength: { value: 2, message: '2文字以上で入力してください' },
							maxLength: { value: 50, message: '50文字以内で入力してください' },
						})}
					/>
					<p className={styles.inputHelp}>2~50文字以内で入力してください。</p>
					{errors.model && (<p style={{ color: 'red' }}>{errors.model.message}</p>)}
				</div>

				<div className={styles.inputGroup}>
					<label className={styles.inputLabel} htmlFor="manufacturer">メーカー*</label>
					<input
						className={styles.input}
						type="text"
						id="manufacturer"
						placeholder="例）Panasonic"
						{...register('manufacturer', {
							required: 'メーカーは必須です',
							minLength: { value: 2, message: '2文字以上で入力してください' },
							maxLength: { value: 100, message: '100文字以内で入力してください' },
						})}
					/>
					<p className={styles.inputHelp}>2~100文字以内で入力してください。</p>
					{errors.model && (<p style={{ color: 'red' }}>{errors.model.message}</p>)}
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
