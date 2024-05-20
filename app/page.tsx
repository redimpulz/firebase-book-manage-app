'use client';
import Link from "next/link";

import { getAllBooks, removeBook, type Book } from "./firebase";
import { useEffect, useState } from "react";

type BookWithID = Book & { bookId: string };

export default function Home() {
  const [bookList, setBookList] = useState<BookWithID[]>([]);

  const getBooks = async ()=> {
    const booksSnapshot = await getAllBooks();
    const bookList: BookWithID[] = [];
    booksSnapshot?.forEach(bookDocument => {
      const book = bookDocument.data() as Book;
      bookList.push({
        bookId: bookDocument.id,
        ...book,
      });
    });
    setBookList(bookList);
  };

  useEffect(() => {getBooks()}, []);

  const handleDelete = async (book: BookWithID) => {
    if (window.confirm(`『${book.title}』を本当に削除しますか？`)) {
      await removeBook(book.bookId);
      await getBooks();
    }
    return;
  }

  return (
    <>
      <h2 className="my-6 sm:my-8 text-3xl sm:text-4xl font-bold">蔵書一覧</h2>
      <ul className="grid gap-2 grid-cols-5">
        {bookList.map(book => (
          <li key={book.bookId} className="contents">
            <span className="col-span-3">{book.title ? book.title : book.isbn}</span>
            <Link href={`/book/${book.bookId}`}>詳細</Link>
            <button
              type="button"
              onClick={() => handleDelete(book)}
              className="bg-image-transparent"
            >🗑️</button>
          </li>
        ))}
      </ul>
      <p className="my-4"><Link href="/book/new">登録</Link></p>
    </>
  );
}
