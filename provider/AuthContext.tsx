'use client';
import { createContext, useEffect, useState, type ReactNode } from 'react';

import {
  createUser,
  getLoginUser,
  loginUser,
  logoutUser,
  onLoginUserChanged,
  type AuthKey
} from '@/firebase/authentication';

type Value = {
  isLogin: boolean;
  signUp: (a: AuthKey) => Promise<void>;
  login: (a: AuthKey) => Promise<void>;
  logout: () => Promise<void>;
};
const defaultValue: Value = {
  isLogin: false,
  signUp: async () => {},
  login: async () => {},
  logout: async () => {}
};
export const AuthContext = createContext<Value>(defaultValue);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [isLogin, setIsLogin] = useState<Value['isLogin']>(!!getLoginUser());

  const signUp: Value['signUp'] = async authKey => {
    try {
      await createUser(authKey);
      setIsLogin(true);
    } catch (e) {
      throw e;
    }
  };

  const login: Value['login'] = async authKey => {
    try {
      await loginUser(authKey);
      setIsLogin(true);
    } catch (e) {
      throw e;
    }
  };

  const logout: Value['logout'] = async () => {
    try {
      await logoutUser();
      setIsLogin(false);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    onLoginUserChanged(maybeUser => {
      setIsLogin(!!maybeUser);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
