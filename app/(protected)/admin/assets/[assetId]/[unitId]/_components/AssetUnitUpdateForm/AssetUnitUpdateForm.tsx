'use client';

import styles from './AssetUnitUpdateForm.module.css';
import BaseButton from '@/components/common/BaseButton';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ja } from 'date-fns/locale/ja';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AssetUnitDetail } from '@/types/api/api';
import {
	getAssetUnitsUpdateApiPath,
	useNavigateAssetAdminDetail,
} from '@/components/hooks/useNavigation';
import LocationsSelect from '@/components/common/LocationsSelect';
import PlusIcon from '@/icons/PlusIcon';
import { patchApi } from '@/lib/patchApi';

/* =========================
 * フォーム用DTO
 * ========================= */
type AssetUnitUpdateFormValues = {
	unitId: string;
	serialNumber: string;
	serialNumberChecked: boolean;
	status: 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE' | 'BROKEN' | 'DISPOSED';
	statusChecked: boolean;
	locationCode: string;
	locationChecked: boolean;
	purchaseDate: string;
	purchaseDateChecked: boolean;
	purchasePrice: number;
	purchasePriceChecked: boolean;
	remarks: string;
	remarksChecked: boolean;
};

type Props = {
	data: AssetUnitDetail | null;
};

export default function AssetUnitUpdateForm({ data }: Props) {
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');
	const [isOpen, setIsOpen] = useState(true);

	const navigateAssetAdminDetail = useNavigateAssetAdminDetail();
	const ASSET_UNIT_UPDATE_API_PATH = getAssetUnitsUpdateApiPath();

	if (!data) return null;

	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors },
	} = useForm<AssetUnitUpdateFormValues>({
		defaultValues: {
			unitId: data.unitId,
			serialNumber: data.serialNumber,
			serialNumberChecked: false,
			status: data.status,
			statusChecked: false,
			locationCode: data.locationCode,
			locationChecked: false,
			purchaseDate: data.purchaseDate,
			purchaseDateChecked: false,
			purchasePrice: data.purchasePrice,
			purchasePriceChecked: false,
			remarks: data.remarks,
			remarksChecked: false,
		},
	});

	registerLocale('ja', ja);

	const watchAll = watch();

	const isAnyChecked =
		watchAll.serialNumberChecked ||
		watchAll.statusChecked ||
		watchAll.locationChecked ||
		watchAll.purchaseDateChecked ||
		watchAll.purchasePriceChecked ||
		watchAll.remarksChecked;

	const onSubmit = async (values: AssetUnitUpdateFormValues) => {
		setSuccess('');
		setError('');

		/** 保険：全未チェックなら送信しない */
		if (!isAnyChecked) {
			setError('更新する項目を選択してください');
			return;
		}

		const payload: Partial<AssetUnitUpdateFormValues> = {
			unitId: values.unitId,
		};

		if (values.serialNumberChecked)
			payload.serialNumber = values.serialNumber;
		if (values.statusChecked) payload.status = values.status;
		if (values.locationChecked)
			payload.locationCode = values.locationCode;
		if (values.purchaseDateChecked)
			payload.purchaseDate = values.purchaseDate;
		if (values.purchasePriceChecked)
			payload.purchasePrice = values.purchasePrice;
		if (values.remarksChecked) payload.remarks = values.remarks;

		try {
			await patchApi<unknown, typeof payload>(
				ASSET_UNIT_UPDATE_API_PATH,
				payload
			);
			navigateAssetAdminDetail(data.assetId);
		} catch (err: any) {
			setError(err.response?.data?.error?.message || 'サーバエラーが発生しました');
		}
	};

	return (
		<div className={styles.signupFormWrapper}>
			<h3
				className={styles.toggleHeader}
				onClick={() => setIsOpen((prev) => !prev)}
			>
				ユニット更新 {isOpen ? '▲' : '▼'}
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
					<div className={styles.inputGroupInner}>
						<label className={styles.inputLabel}>
							シリアル番号
							<input
								className={styles.checkBox}
								type="checkbox"
								{...register('serialNumberChecked')}
							/>
						</label>
						<input
							className={styles.input}
							type="text"
							{...register('serialNumber', {
								minLength: { value: 2, message: '2文字以上で入力してください' },
								maxLength: { value: 100, message: '100文字以内で入力してください' },
							})}
							disabled={!watchAll.serialNumberChecked}
						/>
					</div>
					{errors.serialNumber && (
						<p className={styles.error}>{errors.serialNumber.message}</p>
					)}
				</div>

				{/* ステータス */}
				<div className={styles.inputGroup}>
					<div className={styles.inputGroupInner}>
						<label className={styles.inputLabel}>
							ステータス
							<input
								className={styles.checkBox}
								type="checkbox"
								{...register('statusChecked')}
							/>
						</label>
						<Controller
							name="status"
							control={control}
							render={({ field }) => (
								<select
									className={styles.input}
									{...field}
									disabled={!watchAll.statusChecked}
								>
									<option value="AVAILABLE">利用可能</option>
									<option value="IN_USE">使用中</option>
									<option value="MAINTENANCE">メンテナンス中</option>
									<option value="BROKEN">故障中</option>
									<option value="DISPOSED">廃棄済み</option>
								</select>
							)}
						/>
					</div>
				</div>

				{/* ロケーション */}
				<div className={styles.inputGroup}>
					<div className={styles.inputGroupInner}>
						<label className={styles.inputLabel}>
							ロケーション
							<input
								className={styles.checkBox}
								type="checkbox"
								{...register('locationChecked')}
							/>
						</label>
						<Controller
							name="locationCode"
							control={control}
							render={({ field }) => (
								<LocationsSelect
									className={styles.input}
									value={field.value}
									onLocationsChange={field.onChange}
									disabled={!watchAll.locationChecked}
								/>
							)}
						/>
					</div>
				</div>

				{/* 購入日 */}
				<div className={styles.inputGroup}>
					<div className={styles.inputGroupInner}>
						<label className={styles.inputLabel}>
							購入日
							<input
								className={styles.checkBox}
								type="checkbox"
								{...register('purchaseDateChecked')}
							/>
						</label>
						<Controller
							name="purchaseDate"
							control={control}
							render={({ field }) => (
								<DatePicker
									selected={field.value ? new Date(field.value) : null}
									onChange={(date: Date | null) => {
										if (!date) {
											field.onChange('');
											return;
										}
										field.onChange(date.toISOString().split('T')[0]);
									}}
									dateFormat="yyyy-MM-dd"
									locale="ja"
									portalId="__next"
									className={[styles.dateInput, styles.input].join(' ')}
									disabled={!watchAll.purchaseDateChecked}
								/>
							)}
						/>
					</div>
				</div>

				{/* 購入金額 */}
				<div className={styles.inputGroup}>
					<div className={styles.inputGroupInner}>
						<label className={styles.inputLabel}>
							購入金額
							<input
								className={styles.checkBox}
								type="checkbox"
								{...register('purchasePriceChecked')}
							/>
						</label>
						<input
							className={styles.input}
							type="number"
							{...register('purchasePrice', {
								min: { value: 0, message: '0以上で入力してください' },
							})}
							disabled={!watchAll.purchasePriceChecked}
						/>
					</div>
					{errors.purchasePrice && (
						<p className={styles.error}>{errors.purchasePrice.message}</p>
					)}
				</div>

				{/* 備考 */}
				<div className={styles.inputGroup}>
					<div className={styles.inputGroupInner}>
						<label className={styles.inputLabel}>
							備考
							<input
								className={styles.checkBox}
								type="checkbox"
								{...register('remarksChecked')}
							/>
						</label>
						<textarea
							className={styles.input}
							rows={2}
							{...register('remarks')}
							disabled={!watchAll.remarksChecked}
						/>
					</div>
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
