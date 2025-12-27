'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigateHome, useNavigateLogin } from '@/components/hooks/useNavigation';

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isInitialized } = useAuth();
  const navigateHome = useNavigateHome();

  useEffect(() => {
    if (!isInitialized) return;

    // 未ログイン or 管理者以外は弾く
    if (!user || user.role !== 'ADMIN') {
      navigateHome();
    }
  }, [user, isInitialized, navigateHome]);

  // 初期化中
  if (!isInitialized) {
    return null;
  }

  // 管理者以外は描画しない
  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  return <>{children}</>;
}
