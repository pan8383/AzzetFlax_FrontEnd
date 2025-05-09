'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface formData {
  loginId: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<formData>({
    loginId: '',
    password: '',
  });
  const [error, setError] = useState('');

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // フォーム送信時のページリロードを防ぐ
    e.preventDefault();

    // APIリクエストを送信
    try {
      const loginResult = await axios.post('/api/login', formData);

      // ログイン成功後にホーム画面に遷移
      if (loginResult.status === 200) {
        // JWTをlocalStorageに保存
        localStorage.setItem('token', loginResult.data.token);
        console.log(loginResult.data.token);

        // ホーム画面に遷移
        router.push('/');
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          setError(error.response.data?.error || '認証に失敗しました');
        } else if (error.response.status === 500) {
          setError('サーバーエラーが発生しました');
        } else {
          setError('不明なエラーが発生しました');
        }
      } else {
        setError('リクエストエラーが発生しました');
      }
    }
  };

  return (
    <form onSubmit={formSubmit}>
      <div>
        <label htmlFor="loginId">ユーザーID</label>
        <input
          type="text"
          id="loginId"
          value={formData.loginId}
          onChange={(e) => setFormData({ ...formData, loginId: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="password">パスワード</label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">ログイン</button>
    </form>
  );
}
