'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getLoginUser, onLoginUserChanged } from '@/firebase/authentication';
import { AuthProvider } from '@/provider/AuthContext';
import AppHeader from '@/components/AppHeader';

import './globals.css';

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState(!!getLoginUser());

  useEffect(() => {
    onLoginUserChanged(maybeUser => {
      setIsLogin(!!maybeUser);
    });
  }, []);

  useEffect(() => {
    console.log(pathname, isLogin);
    if (!isLogin && pathname !== 'login' && pathname !== '/signup') {
      router.push('/login');
    }
  }, [pathname, isLogin, router]);

  return (
    <html lang="ja">
      <head>
        <title>Firebase Manage Book App</title>
        <meta
          name="description"
          content="FirebaseとNext.jsで作られた蔵書管理アプリ"
        />
      </head>
      <body className="min-h-dvh sm:text-2xl">
        <AuthProvider>
          <AppHeader />
          <main className="max-w-3xl mx-auto px-2 text-center">
            {!isLogin && pathname !== '/login' && pathname !== '/signup'
              ? 'loading...'
              : children}
          </main>
          <footer className="absolute bottom-0 w-full text-sm">
            <ul className="inline-flex justify-between w-full">
              <li className="inline-block p-2">
                <Link
                  href="https://github.com/redimpulz/firebase-book-manage-app"
                  className="font-bold"
                >
                  GitHub Repo.
                </Link>
              </li>
              <li className="inline-block p-2">
                © 2024
                <Link
                  href="https://redimpulz.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  RedImpulz inc.
                </Link>
              </li>
            </ul>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
