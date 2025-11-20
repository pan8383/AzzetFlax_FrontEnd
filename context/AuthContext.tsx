'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';
import { AuthUser } from '@/types/ApiResponse';


// ==============================
// 型定義
// ==============================

/**
 * ユーザー認証情報の型
 */
type AuthContextType = {
	/** 現在ログイン中のユーザー情報（未ログイン時は null） */
	user: AuthUser | null;
	/** ユーザー情報を更新するための関数 */
	setUser: (user: AuthUser | null) => void;
};

// ==============================
// コンテキスト作成
// ==============================

/**
 * 認証情報を共有するための React コンテキスト。
 * デフォルト値は未ログイン状態（user: null）。
 */
const AuthContext = createContext<AuthContextType>({
	user: null,
	setUser: () => { },
});

// ==============================
// プロバイダーコンポーネント
// ==============================

/**
 * アプリ全体でユーザー認証情報を共有するためのプロバイダー。
 * ルート階層（layout.tsx など）でラップして使用する。
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	/** 現在のユーザー情報を保持 */
	const [user, setUser] = useState<AuthUser | null>(null);

	/** 現在のパス名を取得（ページ遷移検知用） */
	const pathname = usePathname();

	useEffect(() => {
		/**
		 * ログイン済みユーザー情報を取得する非同期関数
		 * ページ遷移のたびに `/me` エンドポイントへリクエストを送信。
		 */
		const fetchUser = async () => {
			try {
				// 認証済みユーザー情報を取得
				const res = await axiosInstance.get('/me');
				setUser(res.data); // 成功時にユーザー情報をセット
			} catch {
				// 未ログインや認証エラー時は null に設定
				setUser(null);
			}
		};

		fetchUser();
	}, [pathname]); // ページが切り替わるたびにユーザー情報を再取得

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

// ==============================
// カスタムフック
// ==============================

/**
 * コンポーネント内で認証情報（ユーザー情報・更新関数）を簡単に利用するためのフック。
 *
 * @example
 * const { user, setUser } = useAuth();
 */
export const useAuth = () => useContext(AuthContext);
