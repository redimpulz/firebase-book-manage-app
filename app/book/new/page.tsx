'use client';
import Link from 'next/link';
import BookForm from '@/components/BookForm';
import Button from '@/components/Button';

export default function Page() {
  return (
    <>
    <div className='flex flex-col items-center gap-2 '>
    <h2>本の登録</h2>
      <BookForm />
      <p>
      <Link href="/">
        <Button>一覧に戻る</Button>
        </Link>
      </p>
    </div>
    </>
  );
}
