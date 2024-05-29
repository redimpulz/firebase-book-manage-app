'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { onLoginUserChanged, logoutUser } from '@/firebase/authentication';

export default function LogoutButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    onLoginUserChanged(user => setIsLogin(!!user));
  }, [pathname]);

  const handleLogout = () => {
    logoutUser().then(() => router.push('/login'));
  };

  return (
    <>
      {isLogin && (
        <button onClick={handleLogout} className="text-base sm:text-xl p-2">
          ログアウト
        </button>
      )}
    </>
  );
}
