'use client';
import Link from 'next/link';
import BookForm from '@/components/BookForm';

export default function Page() {
  return (
    <>
      <h2 className="my-6 sm:my-8 text-3xl sm:text-4xl font-bold">本の登録</h2>
      <BookForm />
      <p className="my-6 text-right">
        <Link href="/">一覧に戻る</Link>
      </p>
    </>
  );
}
