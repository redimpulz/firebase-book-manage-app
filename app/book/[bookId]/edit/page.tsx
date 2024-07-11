'use client';
import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';

import { firestore } from '@/firebase/firestore';
import { Book } from '@/types';

import BookForm from '@/components/BookForm';
import BackHomeButton from '@/components/BackHomeButton';

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
      <h2 className="my-6 sm:my-8 text-3xl sm:text-4xl font-bold">本の編集</h2>
      <BookForm book={book} />
      <p className="my-6 text-right">
        <BackHomeButton />
      </p>
    </>
  );
}
