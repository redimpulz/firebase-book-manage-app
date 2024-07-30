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
        </AuthProvider>
      </body>
    </html>
  );
}
