'use client';
import Link from 'next/link';
import { useContext } from 'react';
import { signOut } from 'firebase/auth';

import { AuthContext } from '@/provider/AuthContext';
import { auth } from '@/firebase';

export default function AppHeader() {
  const { user } = useContext(AuthContext);
  const isLogin = !!user;

  return (
    <header className="w-full inline-grid grid-flow-col place-content-between">
      <h1 className="font-bold text-xl sm:text-3xl">
        <Link href="/" className="inline-block p-2">
          Firebase Book Manage App
        </Link>
      </h1>
      {isLogin && (
        <div className="text-base sm:text-xl p-2">
          {user.email}
          {` / `}
          <button onClick={() => signOut(auth)}>ログアウト</button>
        </div>
      )}
    </header>
  );
}
