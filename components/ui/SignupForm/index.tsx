'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import { checkSignupValidation } from '@/types/signup';

export default function SignupForm() {
  const router = useRouter();

  // useFormの登録とエラーメッセージの管理
  const {
    register,
    handleSubmit,
    formState: { errors }, // エラーを取得
  } = useForm({
    defaultValues: {
      user_id: '',
      password: '',
      name: '',
      email: '',
    },
  });

  const [error, setError] = useState(''); // エラーメッセージの状態を管理

  // サインアップフォームの送信処理
  const onSubmit = async (data: any) => {
    setError(''); // 前回のエラーメッセージをリセット

    // バリデーションチェック
    const [isValid, validationMessage] = checkSignupValidation(data.user_id, data.password, data.name, data.email);
    if (!isValid) {
      setError(validationMessage); // バリデーションエラーメッセージを設定
      return;
    }

    // APIリクエストを送信
    try {
      await axios.post('/api/signup', data);
      router.push('/'); // 成功したらホームにリダイレクト
    } catch (error: any) {
      setError(error.response?.data?.error || 'サーバーエラーが発生しました');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p>新規ユーザー作成</p>
      </div>
      <div>
        <label htmlFor="user_id">ユーザーID</label>
        <input type="text" id="user_id" {...register('user_id', { required: 'ユーザーIDは必須です' })} />
        {errors.user_id && <p style={{ color: 'red' }}>{errors.user_id.message}</p>}
      </div>
      <div>
        <label htmlFor="password">パスワード</label>
        <input type="password" id="password" {...register('password', { required: 'パスワードは必須です' })} />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="name">名前</label>
        <input type="text" id="name" {...register('name', { required: '名前は必須です' })} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email">メールアドレス</label>
        <input type="email" id="email" {...register('email', { required: 'メールアドレスは必須です' })} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">登録</button>
    </form>
  );
}
