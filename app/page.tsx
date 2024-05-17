'use client';
import Link from "next/link";

import { Book, BookWithID, getAllBooks, removeBook } from "./firebase";
import { useEffect, useState } from "react";

export default function Home() {
  const [bookList, setBookList] = useState<BookWithID[]>([]);

  const getBooks = async ()=> {
    const booksSnapshot = await getAllBooks();
    const bookList: BookWithID[] = [];
    booksSnapshot?.forEach(bookDocument => {
      const book = bookDocument.data() as Book;
      const bookWithID: BookWithID = {
        bookId: bookDocument.id,
        ...book,
      };
      bookList.push(bookWithID);
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
    <main>
      <h1>蔵書一覧</h1>
      <ul>
        {bookList.map(book => (
          <li key={book.bookId}>
            <span>{book.title ? book.title : book.isbn}</span>
            <Link href={`/book/${book.bookId}`}>詳しくみる</Link>
            <button type="button" onClick={() => handleDelete(book)}>🗑️</button>
          </li>
        ))}
      </ul>
      <p><Link href="/book/new">登録する</Link></p>
    </main>
  );
}
