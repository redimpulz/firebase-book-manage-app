'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MouseEvent, MouseEventHandler, useContext } from 'react';
import { AuthContext } from './AuthContext';

export default function AuthButton() {
  const pathname = usePathname();
  const { isLogin, logout } = useContext(AuthContext);

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    logout();
    return;
  };

  return (
    <div className="inline-grid">
      {isLogin && (
        <button onClick={handleClick} className="text-base sm:text-xl p-2">
          ログアウト
        </button>
      )}
      {!isLogin && pathname !== '/login' && (
        <Link href="/login" className="text-base sm:text-xl p-2">
          ログイン
        </Link>
      )}
      {!isLogin && pathname !== '/signup' && (
        <Link href="/signup" className="text-base sm:text-xl p-2">
          新規登録
        </Link>
      )}
    </div>
  );
}
