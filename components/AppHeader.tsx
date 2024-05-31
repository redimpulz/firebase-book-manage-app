'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '@/provider/AuthContext';

export default function AppHeader() {
  const pathname = usePathname();
  const { isLogin, logout } = useContext(AuthContext);

  return (
    <header className="w-full inline-grid grid-flow-col place-content-between">
      <h1 className="font-bold text-xl sm:text-3xl">
        {isLogin ? (
          <Link href="/" className="inline-block p-2">
            Firebase Book Manage App
          </Link>
        ) : (
          <span className="inline-block p-2">Firebase Book Manage App</span>
        )}
      </h1>
      {isLogin && (
        <button onClick={logout} className="text-base sm:text-xl p-2">
          ログアウト
        </button>
      )}
    </header>
  );
}
