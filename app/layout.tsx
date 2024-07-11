'use client';
import Link from 'next/link';

import { AuthProvider } from '@/provider/AuthContext';
import AppHeader from '@/components/AppHeader';

import './globals.css';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
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
          <main className="max-w-3xl mx-auto px-2 text-center">{children}</main>
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
                  {` REDIMPULZ inc.`}
                </Link>
              </li>
            </ul>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
