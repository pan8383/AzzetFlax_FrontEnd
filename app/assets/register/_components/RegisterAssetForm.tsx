'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import axiosInstance from '@/lib/axiosInstance';
import { AxiosError } from 'axios';
import { checkAssetsRegisterValidation } from '@/validations/assets';
import { AssetsRegisterParams } from '@/types/assets';

export default function RegisterAssetForm() {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // useFormの設定
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AssetsRegisterParams>({
        defaultValues: {
            name: '',
            category: '',
            model: '',
            stock: 0,
        },
    });

    // 送信処理
    const onSubmit = async (data: AssetsRegisterParams) => {
        setError('');
        try {
            await axiosInstance.post('/assets/register', data);
            setSuccess('資産を登録しました。');
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
            <h2>資産登録</h2>

            <div>
                <label htmlFor="name">表示名</label>
                <input
                    type="text"
                    id="name"
                    {...register('name', { required: '表示名は必須です' })}
                />
                {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
            </div>

            <div>
                <label htmlFor="category">カテゴリー</label>
                <select
                    id="category"
                    {...register('category', { required: 'カテゴリーは必須です' })}
                >
                    <option value="">選択してください</option>
                    <option value="PC">PC</option>
                    <option value="LANケーブル">LANケーブル</option>
                </select>
                {errors.category && <p style={{ color: 'red' }}>{errors.category.message}</p>}
            </div>

            <div>
                <label htmlFor="model">型番</label>
                <input
                    type="text"
                    id="model"
                    {...register('model', { required: '型番は必須です' })}
                />
                {errors.model && <p style={{ color: 'red' }}>{errors.model.message}</p>}
            </div>

            <div>
                <label htmlFor="stock">在庫数</label>
                <input
                    type="number"
                    id="stock"
                    {...register('stock', {
                        required: '在庫数は必須です',
                        valueAsNumber: true,
                        min: { value: 0, message: '0以上で入力してください' },
                    })}
                />
                {errors.stock && <p style={{ color: 'red' }}>{errors.stock.message}</p>}
            </div>

            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button type="submit">登録</button>
        </form>
    );
}
