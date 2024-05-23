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
            <Link href="/" className="inline-block p-2">
              Firebase Book Manage App
            </Link>
          </h1>
        </header>
        <main className="max-w-3xl mx-auto px-2 text-center">
          {children}
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
      </body>
    </html>
  );
}
