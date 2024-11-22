'use client';
import Link from 'next/link';
import Image from 'next/image';
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
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import BookItem from '@/components/BookItem';

export default function Page() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AuthContext);

  const getBooks = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
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
      <div className="flex flex-col gap-2">
        <h2 className="text-center">蔵書一覧</h2>
        {isLoading && (
          <div className="flex justify-center my-4">
            <Loading />
          </div>
        )}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
          {books.map(x => (
            <BookItem key={x.id} book={x} onClickDelete={handleDelete} />
          ))}
        </ul>
        <Link href="/book/new" className="flex flex-col">
          <Button>本を追加</Button>
        </Link>
      </div>
    </>
  );
}
