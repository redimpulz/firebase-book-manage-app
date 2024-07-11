'use client';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where
} from 'firebase/firestore';

import { firestore } from '@/firebase/firestore';
import { Book } from '@/types';
import { AuthContext } from '@/provider/AuthContext';

export default function Page() {
  const [books, setBooks] = useState<Book[]>([]);

  const { user } = useContext(AuthContext);

  const getBooks = async () => {
    try {
      const q = query(
        collection(firestore, 'books'),
        where('uid', '==', user?.uid)
      );
      const snapShot = await getDocs(q);
      const data = snapShot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as Book[];
      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  const handleDelete = async (book: Book) => {
    try {
      if (window.confirm(`「${book.title}」を削除しますか？`)) {
        await deleteDoc(doc(firestore, 'books', book.id));
        await getBooks();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2 className="mt-6 sm:mt-8 text-3xl sm:text-4xl font-bold">蔵書一覧</h2>
      <ul className="grid gap-y-2 sm:gap-x-4 grid-cols-5 my-6 sm:my-12">
        {books.map(x => (
          <li key={x.id} className="contents">
            <span className="col-span-3">{x.title ? x.title : x.isbn}</span>
            <span className="w-fit ml-auto">
              <Link href={`/book/${x.id}`} className="button-center">
                詳細
              </Link>
            </span>
            <button
              type="button"
              onClick={() => handleDelete(x)}
              className="text-left"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
      <p className="text-center">
        <Link href="/book/new" className="button-center">
          本を追加
        </Link>
      </p>
    </>
  );
}
