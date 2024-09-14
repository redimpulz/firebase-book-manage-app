'use client';
import Link from 'next/link';
import BookForm from '@/components/BookForm';

export default function Page() {
  return (
    <>
      <h2>本の登録</h2>
      <BookForm />
      <p>
        <Link href="/">一覧に戻る</Link>
      </p>
    </>
  );
}
