'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { getBook, type Book } from "@/app/firebase";
import BackHomeButton from "@/components/BackHomeButton";

export default function BookDetail({params}: {params: {bookId: string}}) {
  const bookId = params.bookId;
  const [book, setBook] = useState<Book>();

  useEffect(()=> {
    getBook(bookId).then(book => {
      if (book) setBook(book as Book);
    });
  }, [bookId]);

  return (
    <>
      <h1 className="text-3xl sm:text-4xl my-6 sm:my-8">{book?.title ?? 'タイトル未登録'}</h1>
      <dl className="grid gap-4 grid-cols-5 mx-auto">
        <dt className="text-right text-low-contrast font-semibold">ISBN</dt>
        <dd className="text-justify col-span-4">{book?.isbn}</dd>
        <dt className="text-right text-low-contrast font-semibold">メモ</dt>
        <dd className="text-justify col-span-4">{book?.memo}</dd>
      </dl>
      <p className="my-6">
        <Link
          href={`/book/${bookId}/edit`}
          className="font-bold text-low-contrast"
        >
          編集する
        </Link>
      </p>
      <p className="my-6 text-right">
        <BackHomeButton />
      </p>
    </>
  );
}
