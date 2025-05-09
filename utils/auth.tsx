import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // トークンが存在しない場合はログイン画面にリダイレクト
    if (!token) {
      router.push('/login'); // ログインページに遷移
      return;
    }

    // サーバーでトークンの検証を行う
    const verifyToken = async () => {
      try {
        const response = await axios.get('/api/verify-token', {
          headers: {
            Authorization: `Bearer ${token}`, // トークンをヘッダーに渡す
          },
        });

        const data = response.data;

        if (!data.isValid) {
          router.push('/login'); // トークンが無効または期限切れの場合
        } else {
          setUserRole(data.role);

          // アクセス禁止ページにリダイレクト（admin 以外の場合）
          if (data.role !== 'admin') {
            router.push('/access-denied');
          } else {
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        router.push('/login');
      }
    };

    verifyToken();
  }, [router]);

  return { isAuthenticated, userRole };
}
