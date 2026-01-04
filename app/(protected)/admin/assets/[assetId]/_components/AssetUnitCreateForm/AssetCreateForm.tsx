'use client';

import styles from './AssetUnitCreateForm.module.css';
import BaseButton from '@/components/common/BaseButton';
import { postApi } from '@/lib/postApi';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ja } from "date-fns/locale/ja";
import PlusIcon from '@/icons/PlusIcon';
import { getAssetUnitsCreateApiPath } from '@/components/hooks/useNavigation';
import LocationsSelect from '@/components/common/LocationsSelect';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAssetUnits } from '@/components/hooks/useAssetUnits';

/* =========================
 * フォーム用DTO
 * ========================= */
type AssetUnitCreateFormValues = {
	assetId: string;
	serialNumber: string;
	locationCode: string;
	purchaseDate: string;
	purchasePrice: number;
	remarks: string;
};

type Props = {
	assetId: string;
	isOpen: boolean;
	onToggle: () => void;
};

export default function AssetUnitCreateForm({ assetId, isOpen, onToggle }: Props) {
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');
	const { refetch } = useAssetUnits(assetId);

	const ASSET_UNIT_CREATE_API_PATH = getAssetUnitsCreateApiPath(assetId);

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<AssetUnitCreateFormValues>({
		defaultValues: {
			assetId,
			serialNumber: '',
			locationCode: '',
			purchaseDate: '',
			purchasePrice: 0,
			remarks: '',
		},
	});
	registerLocale("ja", ja);

	const onSubmit = async (data: AssetUnitCreateFormValues) => {
		setError('');
		setSuccess('');

		try {
			await postApi<unknown, AssetUnitCreateFormValues>(ASSET_UNIT_CREATE_API_PATH, data);
			setSuccess('ユニットを登録しました。');
			reset();
			await refetch();
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
				新規ユニット登録 {isOpen ? '▲' : '▼'}
			</h3>

			<form
				className={`${styles.form} ${!isOpen ? styles.hidden : ''}`}
				onSubmit={handleSubmit(onSubmit)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') e.preventDefault();
				}}
			>
				{/* シリアル番号 */}
				<div className={styles.inputGroup}>
					<label className={styles.inputLabel}>シリアル番号*</label>
					<input
						className={styles.input}
						type="text"
						placeholder="X2025AB01"
						{...register('serialNumber', {
							required: 'シリアル番号は必須です',
							minLength: { value: 2, message: '2文字以上で入力してください' },
							maxLength: { value: 100, message: '100文字以内で入力してください' },
						})}
					/>
					{errors.serialNumber && (
						<p className={styles.error}>{errors.serialNumber.message}</p>
					)}
				</div>

				{/* ロケーション */}
				<div className={styles.inputGroup}>
					<label className={styles.inputLabel}>ロケーション*</label>
					<Controller
						name="locationCode"
						control={control}
						rules={{ required: 'ロケーションは必須です' }}
						render={({ field, fieldState }) => (
							<>
								<LocationsSelect
									value={field.value}
									onLocationsChange={field.onChange}
								/>
								{fieldState.error && (
									<p className={styles.error}>{fieldState.error.message}</p>
								)}
							</>
						)}
					/>
				</div>

				{/* 購入日 */}
				<div className={styles.inputGroup}>
					<label className={styles.inputLabel}>購入日*</label>
					<Controller
						name="purchaseDate"
						control={control}
						rules={{ required: '購入日は必須です' }}
						render={({ field, fieldState }) => (
							<div style={{ position: 'relative', zIndex: 1000 }}>
								<DatePicker
									selected={field.value ? new Date(field.value) : null}
									onChange={(date: Date | null) => {
										if (!date) {
											field.onChange('');
											return;
										}
										const iso = date.toISOString().split("T")[0];
										field.onChange(iso);
									}}
									dateFormat="yyyy-MM-dd"
									locale="ja"
									portalId="__next"
									placeholderText="日付を選択"
									className={styles.dateInput}
								/>
								{fieldState.error && (
									<p className={styles.error}>{fieldState.error.message}</p>
								)}
							</div>
						)}
					/>
				</div>

				{/* 購入金額 */}
				<div className={styles.inputGroup}>
					<label className={styles.inputLabel}>購入金額*</label>
					<input
						className={styles.input}
						type="number"
						placeholder="10000"
						{...register('purchasePrice', {
							required: '購入金額は必須です',
							min: { value: 0, message: '0以上で入力してください' },
						})}
					/>
					{errors.purchasePrice && (
						<p className={styles.error}>{errors.purchasePrice.message}</p>
					)}
				</div>

				{/* 備考 */}
				<div className={styles.inputGroup}>
					<label className={styles.inputLabel}>備考</label>
					<textarea
						className={styles.remarksTextarea}
						placeholder="メモ"
						rows={2}
						{...register('remarks')}
					/>
				</div>

				{/* 成功・エラー */}
				{success && <p className={styles.success}>{success}</p>}
				{error && <p className={styles.error}>{error}</p>}

				<BaseButton
					className={styles.submitButton}
					type="submit"
					icon={<PlusIcon />}
					label="登録"
				/>
			</form>
		</div>
	);
}
