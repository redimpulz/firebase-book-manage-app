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

import { firestore } from '@/firebase';
import { Book } from '@/types';

export default function Page() {
  const [books, setBooks] = useState<Book[]>([]);

  const getBooks = async () => {
    try {
      const q = query(collection(firestore, 'books'));
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
  }, []);

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
            <span>{x.title ? x.title : x.isbn}</span>
            <span>
              <Link href={`/book/${x.id}`}>詳細</Link>
            </span>
            <button type="button" onClick={() => handleDelete(x)}>
              🗑️
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
