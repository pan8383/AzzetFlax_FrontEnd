'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCategory } from '@/components/hooks/useCategory';
import { AssetCreateResponse } from '@/types/api/api';
import { postApi } from '@/lib/postApi';
import { useAssetRegisterPath } from '@/components/hooks/useNavigation';

type AssetCreateFormValues = {
  name: string;
  categoryCode: string;
  model: string;
  manufacturer: string;
}

export default function AssetCreateForm() {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const ASSET_REGISTER_PATH = useAssetRegisterPath();

  // useFormの設定
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssetCreateFormValues>({
    defaultValues: {
      name: '',
      categoryCode: '',
      model: '',
      manufacturer: '',
    },
  });

  // カテゴリーをAPIで取得する
  const { category, categoryFetchError, categoryLoading } = useCategory();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // 送信処理
  const onSubmit = async (data: AssetCreateFormValues) => {
    setError('');
    setSuccess('');

    try {
      await postApi<AssetCreateResponse, AssetCreateFormValues>(ASSET_REGISTER_PATH, data);
      setSuccess('資産を登録しました。');
      reset();
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'サーバエラーが発生しました');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        // フォーム全体で Enter 押下時の送信を無効化
        if (e.key === 'Enter') e.preventDefault();
      }}
    >
      <h3>資産登録</h3>
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
          {...register('categoryCode', {
            required: 'カテゴリーは必須です',
            maxLength: { value: 50, message: '50文字以内で入力してください' },
            minLength: { value: 2, message: '2文字以上で入力してください' },
          })}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {category.map((e) => (
            <option key={e.categoryCode} value={e.categoryCode}>
              {e.name}
            </option>
          ))}
        </select>

        {/* バリデーションエラー */}
        {errors.categoryCode && <p style={{ color: 'red' }}>{errors.categoryCode.message}</p>}

        {/* カテゴリ取得中 */}
        {categoryLoading && <p style={{ color: 'blue' }}>カテゴリを読み込み中です...</p>}

        {/* カテゴリ取得エラー */}
        {categoryFetchError && <p style={{ color: 'red' }}>{categoryFetchError}</p>}
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

      {/* 成功 */}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* サーバエラー */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit">登録</button>
    </form>
  );
}
