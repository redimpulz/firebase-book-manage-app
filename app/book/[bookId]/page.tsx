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
      <h2>{book?.title}</h2>
      <BookImage src={book?.image || '/200x283.png'} />
      <dl>
        <dt>ISBN</dt>
        <dd>{book?.isbn || '-'}</dd>
        <dt>メモ</dt>
        <dd>{book?.memo || '-'}</dd>
      </dl>
      <p>
        <Link href={`/book/${bookId}/edit`}>編集する</Link>
      </p>
      <p>
        <Link href="/">一覧に戻る</Link>
      </p>
    </>
  );
}
