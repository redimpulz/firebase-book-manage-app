'use client';
import { createContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';

import { auth } from '../firebase';

type Value = {
  user: User | null;
};

const defaultValue: Value = {
  user: null
};
export const AuthContext = createContext<Value>(defaultValue);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { push } = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  useEffect(() => {
    const isLogin = !!user;
    if (!isLogin && pathname !== 'login' && pathname !== '/signup') {
      push('/login');
    }
  }, [pathname, push, user]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
