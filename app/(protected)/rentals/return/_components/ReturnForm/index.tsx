'use client';

import styles from './RentalForms.module.css';
import { useCart } from '@/contexts/RentalCartContext';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '@/lib/axiosInstance';
import BaseButton from '@/components/common/BaseButton';
import { useRentalRegisterPath } from '@/components/hooks/useNavigation';
import { postApi } from '@/lib/postApi';


type RentalFormValues = {
  items: RentalRegisterRequestBody[];
};

export default function ReturnForm() {
  const RENTAL_REGISTER_PATH = useRentalRegisterPath();
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<RentalFormValues>();

  const [resultDatas, setResultDatas] = useState<RentalRegisterResult[]>([]);

  const columns: Column<RentalItems>[] = [
    { key: 'name', label: '名前' },
    { key: 'categoryName', label: 'カテゴリ' },
    { key: 'model', label: 'モデル' },
    { key: 'manufacturer', label: 'メーカー' },
    { key: 'quantity', label: '数量' },
    { key: 'due', label: '返却予定日' },
    { key: 'remarks', label: '備考' },
    { key: 'actions', label: '操作' },
  ];

  // 送信処理
  const onSubmit = async () => {
    setLoading(true);
    setError('');

    const payload: RentalRegisterRequestBody[] = cartItems.map((item, index) => {
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
      const res: RentalRegisterResponse = await postApi<RentalRegisterResponse, RentalRegisterRequestBody[]>(RENTAL_REGISTER_PATH, payload);
      setResultDatas(res.data ?? []);
      setSuccess('レンタルしました');
      reset();
      clearCart();
    } catch (err: any) {
      const apiError = err.response?.data?.error;
      setError(apiError?.message || 'レンタルに失敗しました');
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
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault();
            }}
          >
            <h2>レンタル</h2>

            <BaseTable<RentalItems>
              columns={columns}
              data={cartItems.map((item, index) => ({
                ...item,
                due: (
                  <input
                    type="date"
                    {...register(`items.${index}.due` as const, {
                      required: '返却予定日は必須です',
                    })}
                  />
                ),
                remarks: (
                  <textarea
                    {...register(`items.${index}.remarks` as const)}
                  />
                ),
                actions: (
                  <BaseButton
                    label="削除"
                    variant="danger"
                    size="sm"
                    onClick={() => removeFromCart(item.assetId)}
                  />
                ),
              }))}
            />


            {/* レスポンスメッセージ */}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}


            {/* 送信ボタン */}
            <BaseButton label="確定" type='submit' variant="dark" size="sm" disabled={loading} />
          </form>

        </>
      )}
      {resultDatas.length > 0 && <RentalResultTableView datas={resultDatas} />}
    </>
  );
}
