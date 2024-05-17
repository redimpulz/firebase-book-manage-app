'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, type FormEvent } from "react";
import { getBook, updateBook, type Book } from "../../../firebase";
import { Router } from "next/router";

export default function BookEdit({params}: {params: {bookId: string}}) {
  const router = useRouter();
  const bookId = params.bookId;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [book, setBook] = useState<Book>();

  useEffect(()=> {
    getBook(bookId).then(book => {
      if (book) setBook(book as Book);
    });
  }, [bookId]);
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
  
    const formData = new FormData(event.currentTarget);
    const isbn = formData.get('isbn') || book?.isbn;
    const title = formData.get('title') || book?.title;
    const memo = formData.get('memo') || book?.memo;
    if (!title) {
        setError('タイトルは必須です');
        console.error(title);
        return;
    }
    if (typeof title !== 'string' || typeof isbn !== 'string' || typeof memo !== 'string') {
        setError('invalid form');
        console.error(title,isbn,memo);
        return;
    }
    await updateBook({bookId, isbn, title, memo});
    setIsLoading(false);
    router.push(`/book/${bookId}`);
  }

  return (
    <main>
      <h1>本の編集</h1>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>ISBN: <input type="text" name="isbn" placeholder={book?.isbn} /></label>
        <label>タイトル：<input type="text" name="title" placeholder={book?.title} /></label>
        <label>メモ：<textarea name="memo" placeholder={book?.memo} /></label>
        <button type="submit" disabled={isLoading}>{isLoading ? '保存中...' : '変更を保存'}</button>
      </form>
      <p><Link href="/">一覧に戻る</Link></p>
    </main>
  );
}
