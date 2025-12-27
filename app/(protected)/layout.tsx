'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigateLogin } from '@/components/hooks/useNavigation';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isInitialized } = useAuth();
  const navigateLogin = useNavigateLogin();

  useEffect(() => {
    if (!isInitialized) return;

    // 未認証の場合ログイン画面にリダイレクト
    if (user === null) {
      navigateLogin();
    }
  }, [user, isInitialized, navigateLogin]);

  // TODO: 初期化中は何も描画しない
  if (!isInitialized) {
    return null;
  }

  // TODO: 未認証なら描画しない
  if (user === null) {
    return null;
  }

  return <>{children}</>;
}
