'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';

type AuthContextType = {
	users: Users | null;
	setUser: (user: Users | null) => void;
};

const AuthContext = createContext<AuthContextType>({
	users: null,
	setUser: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [users, setUser] = useState<Users | null>(null);
	const pathname = usePathname();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await axiosInstance.get('/me');
				setUser(res.data.data);
			} catch {
				setUser(null);
			}
		};

		fetchUser();
	}, [pathname]);

	return <AuthContext.Provider value={{ users, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
