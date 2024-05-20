import Link from 'next/link';
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Firebase Manage Book App",
  description: "FirebaseとNext.jsで作られた蔵書管理アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-dvh sm:text-2xl">
        <header className="w-full">
          <h1 className="font-bold text-xl sm:text-3xl">
            <Link href="/">Firebase Book Manage App</Link>
          </h1>
        </header>
        <main className="max-w-3xl mx-auto px-4 text-center">
          {children}
        </main>
        <footer className="absolute bottom-0 w-full text-right p-2 text-sm">
          © 2024, RedImpulz inc.
        </footer>
      </body>
    </html>
  );
}
