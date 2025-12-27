'use client';

import styles from './RentalForm.module.css';
import { useCart } from '@/contexts/RentalCartContext';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import BaseButton from '@/components/common/BaseButton';
import { useRentalRegisterPath } from '@/components/hooks/useNavigation';
import { postApi } from '@/lib/postApi';
import { BaseTable } from '@/components/common/BaseTable';
import { AssetEntity } from '@/types/api/entities';
import {
  CreateRentalRequest,
  RentalCreateResponse,
  RentalCreateResult,
} from '@/types/api/api';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import DatePicker, { registerLocale } from "react-datepicker";
import { ja } from "date-fns/locale/ja";
import "react-datepicker/dist/react-datepicker.css";
import RentalResultTableView from '@/app/(protected)/assets/rental/history/_components/RentalResultTableView';

type RentalTableColumn = AssetEntity & {
  quantity: number;
};

type RentalFormValues = {
  items: CreateRentalRequest[];
};

export default function RentalForm() {
  registerLocale("ja", ja);

  const RENTAL_REGISTER_PATH = useRentalRegisterPath();
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
  } = useForm<RentalFormValues>();

  const [resultDatas, setResultDatas] = useState<RentalCreateResult[]>([]);

  const columnHelper = createColumnHelper<RentalTableColumn>();
  const columns: ColumnDef<RentalTableColumn, any>[] = [
    columnHelper.accessor('name', {
      header: '名前',
      cell: (info) => <i>{info.getValue()}</i>,
    }),
    columnHelper.accessor('categoryName', {
      header: 'カテゴリー',
      enableSorting: false,
    }),
    columnHelper.accessor('model', {
      header: '型番',
    }),
    columnHelper.accessor('manufacturer', {
      header: 'メーカー',
    }),
    columnHelper.accessor('quantity', {
      header: '数量',
      size: 50,
      enableSorting: false,
    }),
    columnHelper.display({
      id: 'due',
      header: '返却予定日',
      size: 150,
      cell: (info) => {
        const index = info.row.index;

        return (
          <Controller
            name={`items.${index}.due`}
            control={control}
            rules={{ required: '返却予定日は必須です' }}
            render={({ field, fieldState }) => (
              <div style={{ position: 'relative', zIndex: 1000 }}>
                <DatePicker
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date: Date | null) => {
                    if (!date) {
                      field.onChange("");
                      return;
                    }
                    const iso = date.toISOString().split("T")[0];
                    field.onChange(iso);
                  }}
                  dateFormat="yyyy/MM/dd"
                  locale="ja"
                  placeholderText="日付を選択"
                  className={styles.dateInput}
                  portalId="__next"
                />
                {fieldState.error && (
                  <p style={{ color: 'red' }}>{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        );
      },
    }),
    columnHelper.display({
      id: 'remarks',
      header: '備考',
      size: 150,
      cell: (info) => {
        const index = info.row.index;
        return (
          <textarea
            {...register(`items.${index}.remarks` as const)}
            rows={2}
            className={styles.remarksTextarea}
          />
        );
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: '操作',
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

  // 送信処理
  const onSubmit = async () => {
    setLoading(true);
    setError('');

    const payload: CreateRentalRequest[] = cartItems.map((item, index) => {
      const dueValue = watch(`items.${index}.due`) || '';
      const remarksValue = watch(`items.${index}.remarks`) || '';
      return {
        assetId: item.assetId,
        quantity: item.quantity,
        due: dueValue,
        remarks: remarksValue || null,
      };
    });

    try {
      const res = await postApi<RentalCreateResponse, CreateRentalRequest[]>(RENTAL_REGISTER_PATH, payload);
      setResultDatas(res.data ?? []);
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
    console.log(resultDatas);
  }, [resultDatas]);

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="no-data">カートは空です</div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.preventDefault();
          }}
        >
          <h2>レンタル</h2>

          <BaseTable<RentalTableColumn>
            columns={columns}
            data={cartItems}
          />

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

      {resultDatas.length > 0 && (
        <RentalResultTableView datas={resultDatas} />
      )}
    </>
  );
}
