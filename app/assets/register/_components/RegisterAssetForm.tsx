'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '@/lib/axiosInstance';
import { AxiosError } from 'axios';
import { AssetsRegisterParams } from '@/types/assets';
import { useCategories } from '@/components/hooks/useCategories';

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

    // カテゴリーをAPIで取得する
    const { categories, categoriesfetchError, categoriesLoading } = useCategories();
    const [selectedCategory, setSelectedCategory] = useState<string>('');

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
        <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
                // フォーム全体で[Enter]押下時の送信を無効化
                if (e.key === 'Enter') e.preventDefault();
            }}
        >
            <h2>資産登録</h2>
            <div>
                <label htmlFor="name">表示名</label>
                <input
                    type="text"
                    id="name"
                    {...register('name', {
                        required: '表示名は必須です',
                        maxLength: {
                            value: 50,
                            message: '50文字以内で入力してください'

                        },
                        minLength: {
                            value: 2,
                            message: '2文字以上で入力してください',
                        },
                    })}
                />
                {/* バリデーションエラー */}
                {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
            </div>

            <div>
                <label htmlFor="category">カテゴリー</label>
                <select
                    id="category"
                    {...register('category', {
                        required: 'カテゴリーは必須です',
                        maxLength: { value: 50, message: '50文字以内で入力してください' },
                        minLength: { value: 2, message: '2文字以上で入力してください' },
                    })}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((e) => (
                        <option key={e.name} value={e.name}>
                            {e.name}
                        </option>
                    ))}
                </select>

                {/* バリデーションエラー */}
                {errors.category && <p style={{ color: 'red' }}>{errors.category.message}</p>}

                {/* カテゴリ取得中 */}
                {categoriesLoading && <p style={{ color: 'blue' }}>カテゴリを読み込み中です...</p>}

                {/* カテゴリ取得エラー */}
                {categoriesfetchError && <p style={{ color: 'red' }}>{categoriesfetchError}</p>}
            </div>

            <div>
                <label htmlFor="model">型番</label>
                <input
                    type="text"
                    id="model"
                    {...register('model', {
                        required: '型番は必須です',
                        maxLength: {
                            value: 50,
                            message: '50文字以内で入力してください',
                        },
                        minLength: {
                            value: 2,
                            message: '2文字以上で入力してください',
                        },
                    })}
                />
                {/* バリデーションエラー */}
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
                        max: {
                            value: 10000,
                            message: '10000以下で入力してください'
                        },
                        min: {
                            value: 0,
                            message: '0以上で入力してください'
                        },
                    })}
                />
                {/* バリデーションエラー */}
                {errors.stock && <p style={{ color: 'red' }}>{errors.stock.message}</p>}
            </div>

            {/* 成功 */}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {/* サーバエラー */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button type="submit">登録</button>
        </form>
    );
}
