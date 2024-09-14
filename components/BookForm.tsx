import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import { addDoc, doc, collection, updateDoc } from 'firebase/firestore';

import { firestore } from '@/firebase';
import { Book } from '@/types';

type Props = { book?: Book };

export default function BookForm({ book }: Props) {
  const { push } = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [ISBN, setISBN] = useState('');
  const [memo, setMemo] = useState('');

  const isNew = !book;

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setISBN(book.isbn || '');
      setMemo(book.memo || '');
    }
  }, [book]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    let bookId = book?.id;
    try {
      if (isNew) {
        const doc = await addDoc(collection(firestore, 'books'), {
          title: title,
          isbn: ISBN,
          memo: memo
        });
        bookId = doc.id;
      } else {
        await updateDoc(doc(firestore, 'books', book.id), {
          title: title,
          isbn: ISBN,
          memo: memo
        });
      }
      setIsLoading(false);
      window.alert('保存しました');
      push(`/book/${bookId}`);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
        <label htmlFor="title">タイトル</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <label htmlFor="isbn">ISBN</label>
        <input
          id="isbn"
          type="text"
          value={ISBN}
          onChange={e => setISBN(e.target.value)}
        />

        <label htmlFor="memo">メモ</label>
        <textarea
          id="memo"
          value={memo}
          onChange={e => setMemo(e.target.value)}
        />

        <button type="submit" disabled={isLoading}>
          {isNew && (isLoading ? '登録中...' : '登録')}
          {!isNew && (isLoading ? '保存中...' : '変更を保存')}
        </button>
      </form>
    </>
  );
}
