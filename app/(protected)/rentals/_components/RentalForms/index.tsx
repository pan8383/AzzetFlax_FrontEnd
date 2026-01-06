'use client';

import styles from './RentalForm.module.css';
import { useCart } from '@/contexts/RentalCartContext';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import BaseButton from '@/components/common/BaseButton';
import { postApi } from '@/lib/postApi';
import { BaseTable } from '@/components/common/BaseTable';
import {
  Asset,
  RentalCreateRequest,
  RentalCreateResult,
} from '@/types/api/api';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import DatePicker, { registerLocale } from "react-datepicker";
import { ja } from "date-fns/locale/ja";
import RentalResultTableView from '../RentalResultTableView';
import { getRentalsCreateApiPath } from '@/components/hooks/useNavigation';
import "react-datepicker/dist/react-datepicker.css";

type RentalTableColumn = Asset & {
  quantity: number;
};

type RentalFormValues = {
  expectedReturnDate: string;
  remarks: string | null;
};

export default function RentalForm() {
  registerLocale("ja", ja);

  const RENTALS_CREATE_API_PATH = getRentalsCreateApiPath();
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<RentalFormValues>({
    defaultValues: {
      expectedReturnDate: '',
      remarks: null,
    },
  });

  const [resultDatas, setResultDatas] = useState<RentalCreateResult | null>(null);

  const columnHelper = createColumnHelper<RentalTableColumn>();
  const columns: ColumnDef<RentalTableColumn, any>[] = [
    columnHelper.accessor('name', {
      header: '名前',
      enableSorting: false,
      cell: (info) => <i>{info.getValue()}</i>
    }),
    columnHelper.accessor('categoryName', {
      header: 'カテゴリー',
      enableSorting: false,
    }),
    columnHelper.accessor('model', {
      header: '型番',
      enableSorting: false,
    }),
    columnHelper.accessor('manufacturer', {
      header: 'メーカー',
      enableSorting: false,
    }),
    columnHelper.accessor('quantity', {
      header: '数量',
      enableSorting: false,
      size: 50,
    }),
    columnHelper.display({
      id: 'actions',
      header: '操作',
      enableSorting: false,
      size: 80,
      cell: (info) => (
        <BaseButton
          label="削除"
          variant="danger"
          size="sm"
          onClick={() => removeFromCart(info.row.original.assetId)}
        />
      ),
    }),
  ];

  const onSubmit = async (formData: RentalFormValues) => {
    setLoading(true);
    setError('');

    const payload: RentalCreateRequest = {
      expectedReturnDate: formData.expectedReturnDate,
      remarks: formData.remarks,
      assets: cartItems.map(item => ({
        assetId: item.assetId,
        quantity: item.quantity,
      })),
    };

    try {
      const res = await postApi<RentalCreateResult, RentalCreateRequest>(RENTALS_CREATE_API_PATH, payload);
      setResultDatas(res.data ?? null);
      setSuccess('レンタルしました');
      reset();
      clearCart();
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'レンタルに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('resultDatas updated:', resultDatas);
  }, [resultDatas]);

  return (
    <>
      {cartItems.length !== 0 && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
        >
          <h2>レンタル</h2>

          <BaseTable<RentalTableColumn>
            columns={columns}
            data={cartItems}
          />

          <div className={styles.inputItems}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>返却予定日</label>
              <Controller
                name="expectedReturnDate"
                control={control}
                rules={{ required: '返却予定日は必須です' }}
                render={({ field, fieldState }) => (
                  <div style={{ position: 'relative', zIndex: 1000 }}>
                    <DatePicker
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date: Date | null) => {
                        field.onChange(date ? date.toISOString().split('T')[0] : '');
                      }}
                      dateFormat="yyyy-MM-dd"
                      locale="ja"
                      placeholderText="日付を選択"
                      className={styles.dateInput}
                      portalId="__next"
                    />
                    {fieldState.error && (
                      <p className={styles.error}>{fieldState.error.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>備考</label>
              <Controller
                name="remarks"
                control={control}
                render={({ field }) => (
                  <textarea
                    className={styles.remarksTextarea}
                    {...field}
                    value={field.value ?? ""}
                    rows={2}
                  />
                )}
              />
            </div>
          </div>

          {success && <p style={{ color: 'green' }}>{success}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className={styles.submitWrapper}>
            <BaseButton
              label="確定する"
              type="submit"
              variant="dark"
              size="sm"
              disabled={loading}
            />
          </div>
        </form>
      )}

      {resultDatas !== null && (
        <RentalResultTableView datas={resultDatas} />
      )}
    </>
  );
}
