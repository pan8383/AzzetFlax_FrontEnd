'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/lib/routes';

/**
 * ログイン済みユーザーのみ子コンポーネントを表示する保護付きルート。
 * 未ログインの場合は /login にリダイレクトする。
 *
 * @example
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 */
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 未ログインの場合は /login にリダイレクト
    if (user === null) {
      router.push(ROUTES.login);
    }
  }, [user, router]);

  // user が null の間（API取得前やリダイレクト中）は何も表示しない
  if (user === null) return null;

  return <>{children}</>;
}
