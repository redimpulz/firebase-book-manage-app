'use client';
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where
} from 'firebase/firestore';

import { firestore } from '@/firebase';
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
    if (user?.uid) getBooks();
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
      <h2>蔵書一覧</h2>
      <ul>
        {books.map(x => (
          <li key={x.id}>
            <span>{x.title}</span>

            <Link href={`/book/${x.id}`}>
              <button>詳細</button>
            </Link>
            <button type="button" onClick={() => handleDelete(x)}>
              削除
            </button>
          </li>
        ))}
      </ul>
      <p>
        <Link href="/book/new">本を追加</Link>
      </p>
    </>
  );
}
