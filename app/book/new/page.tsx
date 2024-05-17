'use client';
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { addBook, type Book } from "../../firebase";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
  
    const formData = new FormData(event.currentTarget);
    const isbn = formData.get('isbn');
    const title = formData.get('title');
    const memo = formData.get('memo');
    if (!title) {
        setError('タイトルは必須です');
        return;
    }
    if (typeof title !== 'string' || typeof isbn !== 'string' || typeof memo !== 'string') {
        setError('invalid form');
        console.error(title,isbn,memo);
        return;
    }
    const bookId = await addBook({isbn, title, memo});
    setIsLoading(false);
  }

  return (
    <main>
      <h1>本の登録</h1>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>ISBN<input type="text" name="isbn" placeholder="ISBN978-4-488-74701-5" /></label>
        <label>タイトル<input type="text" name="title" /></label>
        <label>メモ<textarea name="memo" /></label>
        <button type="submit" disabled={isLoading}>{isLoading ? '登録中...' : '登録'}</button>
      </form>
      <p><Link href="/">一覧に戻る</Link></p>
    </main>
  );
}
