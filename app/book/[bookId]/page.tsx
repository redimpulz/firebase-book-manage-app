'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getBook, type Book } from '@/firebase/firestore';
import { getBookImageURL } from '@/firebase/storage';

import BackHomeButton from '@/components/BackHomeButton';
import BookImage from '@/components/BookImage';

export default function BookDetail({ params }: { params: { bookId: string } }) {
  const bookId = params.bookId;
  const [bookImage, setBookImage] = useState<string>('/200x283.png');
  const [bookTitle, setBookTitle] = useState<Book['title']>('タイトル未登録');
  const [bookISBN, setBookISBN] = useState<Book['isbn']>();
  const [bookMemo, setBookMemo] = useState<Book['memo']>();

  useEffect(() => {
    getBook(bookId).then(book => {
      if (book) {
        if (book.title) setBookTitle(book.title);
        setBookISBN(book.isbn);
        setBookMemo(book.memo);
      }
      getBookImageURL(book?.image).then(imageURL => setBookImage(imageURL));
    });
  }, [bookId]);

  return (
    <>
      <h2 className="text-3xl sm:text-4xl font-bold my-6 sm:my-8">
        {bookTitle}
      </h2>
      <BookImage src={bookImage} />
      <dl className="grid gap-y-4 gap-x-3 grid-cols-5 mt-4 mx-auto">
        <dt className="text-right font-semibold">ISBN</dt>
        <dd className="text-justify col-span-4">{bookISBN}</dd>
        <dt className="text-right font-semibold">メモ</dt>
        <dd className="text-justify col-span-4">{bookMemo}</dd>
      </dl>
      <p className="my-6">
        <Link href={`/book/${bookId}/edit`} className="button-center">
          編集する
        </Link>
      </p>
      <p className="my-6 text-right">
        <BackHomeButton />
      </p>
    </>
  );
}
