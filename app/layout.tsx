'use client';
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
      <body>
        <AppHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
