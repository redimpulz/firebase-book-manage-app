'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllBooks, removeBook, type Book } from "@/firebase/firestore";

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
      await removeBook(book.bookId, book);
      await getBooks();
    }
    return;
  }

  return (
    <>
      <h2 className="mt-6 sm:mt-8 text-3xl sm:text-4xl font-bold">蔵書一覧</h2>
      <ul className="grid gap-y-2 sm:gap-x-4 grid-cols-5 my-6 sm:my-12">
        {bookList.map(book => (
          <li key={book.bookId} className="contents">
            <span className="col-span-3">
              {book.title ? book.title : book.isbn}
            </span>
            <span className="w-fit ml-auto">
              <Link href={`/book/${book.bookId}`} className="button-center">
                詳細
              </Link>
            </span>
            <button
              type="button"
              onClick={() => handleDelete(book)}
              className="text-left"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
      <p className="text-center">
        <Link href="/book/new" className="button-center">本を追加</Link>
      </p>
    </>
  );
}
