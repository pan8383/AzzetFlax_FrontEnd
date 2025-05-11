import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { Asset } from '@/types/assets';
import { assetValidation } from '@/validations/assetValication';

export default function RegisterAssetForms() {
  const [error, setError] = useState('');

  // useFormの登録とエラーメッセージの管理
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Asset>({
    defaultValues: {
      asset_id: '',
      name: '',
      category: '',
      model: '',
      stock: 0,
    },
  });

  // サブミット時の処理
  const onSubmit = async (data: any) => {
    setError('');

    // バリデーション実行
    const result = assetValidation.safeParse(data);
    if (!result.success) {
      const message = result.error.errors.map((e) => e.message).join(', ');
      setError(message);
      return;
    }

    try {
      await axios.post('/api/asset/register', result.data);
      reset();
    } catch (error: any) {
      setError(error.response?.data?.error || 'サーバーエラーが発生しました');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2>資材登録</h2>
        </div>
        <div>
          <label htmlFor="name">名前</label>
          <input type="text" id="name" {...register('name')} />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="category">カテゴリ</label>
          <input type="text" id="category" {...register('category')} />
          {errors.category && <p style={{ color: 'red' }}>{errors.category.message}</p>}
        </div>
        <div>
          <label htmlFor="model">型番</label>
          <input type="text" id="model" {...register('model')} />
          {errors.model && <p style={{ color: 'red' }}>{errors.model.message}</p>}
        </div>
        <div>
          <label htmlFor="stock">在庫</label>
          <input type="text" id="stock" {...register('stock')} />
          {errors.stock && <p style={{ color: 'red' }}>{errors.stock.message}</p>}
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">登録</button>
      </form>
    </>
  );
}
