'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { getBook, type Book } from "../../firebase";

export default function BookDetail({params}: {params: {bookId: string}}) {
  const bookId = params.bookId;
  const [book, setBook] = useState<Book>();

  useEffect(()=> {
    getBook(bookId).then(book => {
      if (book) setBook(book as Book);
    });
  }, [bookId]);

  return (
    <main>
      <h1>{book?.title ?? ''}</h1>
      <p>
        {book?.isbn ? `ISBN: ${book.isbn}` : ''}
        <br />
        {book?.memo ? `メモ: ${book.memo}` : ''}
      </p>
      <p>
        <Link href={`/book/${bookId}/edit`}>編集する</Link>
      </p>
      <p><Link href="/">一覧に戻る</Link></p>
    </main>
  );
}
