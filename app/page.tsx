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

export default function Page() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
    }finally{
      setIsLoading(false);
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
      <h2 className="text-center">蔵書一覧</h2>
      {isLoading && <div className="flex justify-center my-4"><div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent text-center"></div></div>}
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map(x => (
          <li key={x.id} className="flex flex-col items-center py-2 bg-gray-300">
            <span className="mr-2">{x.title}</span>
            <Image src={x.image ||'/200x283.png'} alt={x.title} width={200} height={283} className="mt-2"/>
            <div className="flex mt-2">
               <Link href={`/book/${x.id}`}>
              <Button>詳細</Button>
            </Link>
            <Button onClick={() => handleDelete(x)}>削除</Button>
            </div>
          </li>
        ))}
      </ul>
      <p className="text-center mt-2">
        <Button><Link href="/book/new">本を追加</Link></Button>
      </p>
    </>
  );
}
