'use client';

import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabase';

interface AuthContextProps {
	user: SupabaseUser | null;
}

const AuthContext = createContext<AuthContextProps>({ user: null });

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<SupabaseUser | null>(null);

	useEffect(() => {
		// Define an async function to get session
		const getSession = async () => {
			const {
				data: { session },
				error,
			} = await supabase.auth.getSession();
			if (error) {
				console.error('Error fetching session:', error);
			}
			setUser(session?.user ?? null);
		};

		// Call the async function
		getSession();

		// Handle subscription to auth state changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			setUser(session?.user ?? null);
		});

		// Cleanup subscription on unmount
		return () => {
			subscription?.unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextProps => {
	return useContext(AuthContext);
};
