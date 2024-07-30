'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDoc, doc } from 'firebase/firestore';

import { firestore } from '@/firebase';
import { Book } from '@/types';

import BookImage from '@/components/BookImage';

export default function Page({ params }: { params: { bookId: string } }) {
  const { bookId } = params;
  const [book, setBook] = useState<Book>();

  useEffect(() => {
    const getBook = async () => {
      try {
        const snapShot = await getDoc(doc(firestore, 'books', bookId));
        setBook({
          id: bookId,
          ...snapShot.data()
        } as Book);
      } catch (error) {
        console.log(error);
      }
    };
    if (bookId) getBook();
  }, [bookId]);

  return (
    <>
      <h2 className="text-3xl sm:text-4xl font-bold my-6 sm:my-8">
        {book?.title}
      </h2>
      <BookImage src={book?.image || '/200x283.png'} />
      <dl className="grid gap-y-4 gap-x-3 grid-cols-5 mt-4 mx-auto">
        <dt className="text-right font-semibold">ISBN</dt>
        <dd className="text-justify col-span-4">{book?.isbn || '-'}</dd>
        <dt className="text-right font-semibold">メモ</dt>
        <dd className="text-justify col-span-4">{book?.memo || '-'}</dd>
      </dl>
      <p className="my-6">
        <Link href={`/book/${bookId}/edit`} className="button-center">
          編集する
        </Link>
      </p>
      <p className="my-6 text-right">
        <Link href="/">一覧に戻る</Link>
      </p>
    </>
  );
}
