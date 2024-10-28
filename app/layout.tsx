'use client';
import AppHeader from '@/components/AppHeader';
import { AuthProvider } from '@/provider/AuthContext';

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
      <body className="container mx-auto px-4">
        <AuthProvider>
          <AppHeader />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
