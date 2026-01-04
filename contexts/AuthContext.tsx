'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { AuthUser } from '@/types/api/api';
import { postApi } from '@/lib/postApi';
import { getLoginPath, getLogoutApiPath, getRefreshApiPath, useNavigateLogin } from '@/components/hooks/useNavigation';

type AuthContextType = {
	user: AuthUser | null;
	isInitialized: boolean;
	login: (user: AuthUser) => void;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
	user: null,
	isInitialized: false,
	login: () => { },
	logout: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [isInitialized, setIsInitialized] = useState(false);

	const navigateLogin = useNavigateLogin();
	const LOGIN_PATH = getLoginPath();
	const LOGOUT_API_PATH = getLogoutApiPath();
	const REFRESH_API_PATH = getRefreshApiPath();

	// 初期化（refresh）
	useEffect(() => {
		if (typeof window === 'undefined') return;

		// ログインページでは初期化不要
		if (window.location.pathname === LOGIN_PATH) {
			setIsInitialized(true);
			return;
		}

		const init = async () => {
			try {
				// まず localStorage をチェック
				const savedUser = localStorage.getItem('user');
				if (savedUser) {
					setUser(JSON.parse(savedUser));
				} else {
					// localStorage がなければ refresh API を呼ぶ
					const res = await postApi<AuthUser, null>(REFRESH_API_PATH, null);
					if (res.success) {
						setUser(res.data);
						localStorage.setItem('user', JSON.stringify(res.data));
					}
				}
			} catch {
				setUser(null);
			} finally {
				setIsInitialized(true);
			}
		};

		init();
	}, [LOGIN_PATH, REFRESH_API_PATH]);

	const login = (user: AuthUser) => {
		setUser(user);
		localStorage.setItem('user', JSON.stringify(user));
	};

	const logout = async () => {
		try {
			await postApi<null, null>(LOGOUT_API_PATH, null);
		} finally {
			setUser(null);
			localStorage.removeItem('user');
			navigateLogin();
		}
	};

	return (
		<AuthContext.Provider value={{ user, isInitialized, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
