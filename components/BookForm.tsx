'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { addBook, getBook, updateBook, type Book } from "@/app/firebase";

type Props = { type: 'new' } | { type: 'edit', bookId: string };

export default function BookForm(props: Readonly<Props>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formValueISBN, setFormValueISBN] = useState<string>();
  const [formValueTitle, setFormValueTitle] = useState<string>('');
  const [formValueMemo, setFormValueMemo] = useState<string>();
  const isNew = props.type === 'new';

  const [book, setBook] = useState<Book>();
  useEffect(()=> {
    if (props.type === 'edit') {
      getBook(props.bookId).then(book => {
        if (book) {
          setBook(book as Book);
          setFormValueISBN(book.isbn);
          setFormValueTitle(book.title);
          setFormValueMemo(book.memo);
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.type]);
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const newBook = {
      isbn: formValueISBN,
      title: formValueTitle,
      memo: formValueMemo
    } satisfies Book;

    if (isNew) {
      await addBook(newBook);
      setIsLoading(false);
      window.alert(`『${formValueTitle}』を登録しました。`);
    } else {
      if (window.confirm(`次の内容に更新しますか？\nISBN: ${formValueISBN}\nタイトル: ${formValueTitle}\nメモ: ${formValueMemo}`)){
        await updateBook(props.bookId, newBook);
        window.alert('編集内容を保存しました。');
        router.push(`/book/${props.bookId}`);
      }
      setIsLoading(false);
    }
    return;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-5 gap-4 align-middle leading-relaxed"
      >
        <label htmlFor="isbn" className="text-right">ISBN</label>
        <input
          name="isbn"
          type="text"
          value={formValueISBN}
          onChange={e => setFormValueISBN(e.target.value)}
          placeholder={book?.isbn}
          className="col-span-4"
        />
        <label htmlFor="title" className="text-right">タイトル</label>
        <input
          name="title"
          type="text"
          value={formValueTitle}
          onChange={e => setFormValueTitle(e.target.value)}
          placeholder={book?.title}
          required
          className="col-span-4"
        />
        <label htmlFor="memo" className="text-right">メモ</label>
        <textarea
          name="memo"
          value={formValueMemo}
          onChange={e => setFormValueMemo(e.target.value)}
          placeholder={book?.memo}
          className="col-span-4"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="mx-auto col-start-3 text-low-contrast"
        >
          {isNew && (isLoading ? '登録中...' : '登録')}
          {!isNew && (isLoading ? '保存中...' : '変更を保存')}
        </button>
      </form>
    </>
  );
}
