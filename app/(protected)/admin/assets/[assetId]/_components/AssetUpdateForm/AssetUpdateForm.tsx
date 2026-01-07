'use client';

import styles from './AssetUpdateForm.module.css';
import BaseButton from '@/components/common/BaseButton';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AssetUnitDetail } from '@/types/api/api';
import { getAssetUpdateApiPath } from '@/components/hooks/useNavigation';
import PlusIcon from '@/icons/PlusIcon';
import { patchApi } from '@/lib/patchApi';
import CategorySelect from '@/components/common/CategorySelect';

/* =========================
 * フォーム用DTO
 * ========================= */
type AssetUpdateFormValues = {
	assetId: string;
	name: string;
	nameChecked: boolean;
	categoryCode: string;
	categoryCodeChecked: boolean;
	model: string;
	modelChecked: boolean;
	manufacturer: string;
	manufacturerChecked: boolean;
};

type Props = {
	data: AssetUnitDetail | null;
	onUpdated?: () => void;
	isOpen: boolean;
	onToggle: () => void;
};

export default function AssetUpdateForm({ data, onUpdated, isOpen, onToggle }: Props) {
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');

	if (!data) return null;

	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors },
	} = useForm<AssetUpdateFormValues>({
		defaultValues: {
			assetId: data.assetId,
			name: data.name,
			nameChecked: false,
			categoryCode: data.categoryCode,
			categoryCodeChecked: false,
			model: data.model,
			modelChecked: false,
			manufacturer: data.manufacturer,
			manufacturerChecked: false,
		},
	});

	const watchAll = watch();

	const isAnyChecked =
		watchAll.nameChecked ||
		watchAll.categoryCodeChecked ||
		watchAll.modelChecked ||
		watchAll.manufacturerChecked;

	const onSubmit = async (values: AssetUpdateFormValues) => {
		setSuccess('');
		setError('');

		if (!isAnyChecked) {
			setError('更新する項目を選択してください');
			return;
		}

		const payload: Partial<AssetUpdateFormValues> = {
			assetId: values.assetId,
		};

		if (values.nameChecked) payload.name = values.name;
		if (values.categoryCodeChecked) payload.categoryCode = values.categoryCode;
		if (values.modelChecked) payload.model = values.model;
		if (values.manufacturerChecked) payload.manufacturer = values.manufacturer;

		try {
			await patchApi<unknown, typeof payload>(
				getAssetUpdateApiPath(),
				payload
			);

			onUpdated?.();
		} catch (err: any) {
			setError(
				err.response?.data?.error?.message ||
				'サーバエラーが発生しました'
			);
		}
	};

	return (
		<div className={styles.signupFormWrapper}>
			<h3
				className={styles.toggleHeader}
				onClick={onToggle}
			>
				アセット更新 {isOpen ? '▲' : '▼'}
			</h3>

			<form
				className={`${styles.form} ${!isOpen ? styles.hidden : ''}`}
				onSubmit={handleSubmit(onSubmit)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') e.preventDefault();
				}}
			>
				{/* 名前 */}
				<div className={styles.inputGroup}>
					<div className={styles.inputGroupInner}>
						<label className={styles.inputLabel}>
							名前
							<input
								className={styles.checkBox}
								type="checkbox"
								{...register('nameChecked')}
							/>
						</label>
						<input
							className={styles.input}
							type="text"
							{...register('name', {
								minLength: { value: 2, message: '2文字以上で入力してください' },
								maxLength: { value: 100, message: '100文字以内で入力してください' },
							})}
							disabled={!watchAll.nameChecked}
						/>
					</div>
					{errors.name && (
						<p className={styles.error}>{errors.name.message}</p>
					)}
				</div>

				{/* カテゴリー */}
				<div className={styles.inputGroup}>
					<div className={styles.inputGroupInner}>
						<label className={styles.inputLabel}>
							カテゴリー
							<input
								className={styles.checkBox}
								type="checkbox"
								{...register('categoryCodeChecked')}
							/>
						</label>
						<Controller
							name="categoryCode"
							control={control}
							render={({ field }) => (
								<CategorySelect
									className={styles.input}
									value={field.value}
									onCategoryChange={field.onChange}
									disabled={!watchAll.categoryCodeChecked}
								/>
							)}
						/>
					</div>
				</div>

				{/* 型番  */}
				<div className={styles.inputGroup}>
					<div className={styles.inputGroupInner}>
						<label className={styles.inputLabel}>
							型番
							<input
								className={styles.checkBox}
								type="checkbox"
								{...register('modelChecked')}
							/>
						</label>
						<input
							className={styles.input}
							type="text"
							{...register('model', {
								minLength: { value: 2, message: '2文字以上で入力してください' },
								maxLength: { value: 100, message: '100文字以内で入力してください' },
							})}
							disabled={!watchAll.modelChecked}
						/>
					</div>
					{errors.model && (
						<p className={styles.error}>{errors.model.message}</p>
					)}
				</div>

				{/* メーカー */}
				<div className={styles.inputGroup}>
					<div className={styles.inputGroupInner}>
						<label className={styles.inputLabel}>
							メーカー
							<input
								className={styles.checkBox}
								type="checkbox"
								{...register('manufacturerChecked')}
							/>
						</label>
						<input
							className={styles.input}
							type="text"
							{...register('manufacturer', {
								minLength: { value: 2, message: '2文字以上で入力してください' },
								maxLength: { value: 100, message: '100文字以内で入力してください' },
							})}
							disabled={!watchAll.manufacturerChecked}
						/>
					</div>
					{errors.manufacturer && (
						<p className={styles.error}>
							{errors.manufacturer.message}
						</p>
					)}
				</div>

				{!isAnyChecked && (
					<p className={styles.help}>
						更新する項目にチェックを入れてください
					</p>
				)}

				{success && <p className={styles.success}>{success}</p>}
				{error && <p className={styles.error}>{error}</p>}

				<BaseButton
					className={styles.submitButton}
					type="submit"
					icon={<PlusIcon />}
					label="更新"
					disabled={!isAnyChecked}
				/>
			</form>
		</div>
	);
}
