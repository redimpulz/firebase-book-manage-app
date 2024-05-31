'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';

import { addBook, getBook, updateBook, type Book } from '@/firebase/firestore';
import {
  addBookImage,
  getBookImageURL,
  removeBookImage
} from '@/firebase/storage';
import BookImage from './BookImage';

type RBook = Required<Book>;

type Props = { type: 'new' } | { type: 'edit'; bookId: string };

export default function BookForm(props: Readonly<Props>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formValueImage, setImage] = useState<File>();
  const [formValueImageURL, setImageURL] =
    useState<RBook['image']>('/200x283.png');
  const [formValueISBN, setISBN] = useState<RBook['isbn']>('');
  const [formValueTitle, setTitle] = useState<RBook['title']>('');
  const [formValueMemo, setMemo] = useState<RBook['memo']>('');
  const isNew = props.type === 'new';

  const [book, setBook] = useState<Book>();
  useEffect(() => {
    if (props.type === 'edit') {
      getBook(props.bookId).then(book => {
        if (book) {
          setBook(book as Book);
          getBookImageURL(book.image).then(imageURL => setImageURL(imageURL));
          setISBN(book.isbn || '');
          setTitle(book.title || '');
          setMemo(book.memo || '');
        }
        return;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.type]);

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const imageFile = event.target.files ? event.target.files[0] : null;
    if (imageFile) {
      setImage(imageFile);
      setImageURL(URL.createObjectURL(imageFile));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const getNewBook = async () => {
      const newBook: Book = {
        image: book?.image,
        isbn: formValueISBN,
        title: formValueTitle,
        memo: formValueMemo
      };
      if (formValueImage) {
        // 古いほうは削除
        if (typeof book?.image === 'string') await removeBookImage(book.image);
        newBook.image = await addBookImage(formValueImage);
      }
      return newBook;
    };

    const newBookString =
      ` 書影: ${formValueImage?.name || '未登録'}\n` +
      ` ISBN: ${formValueISBN || '未登録'}\n` +
      ` タイトル: ${formValueTitle}\n` +
      ` メモ: ${formValueMemo || '未登録'}`;

    if (isNew) {
      if (window.confirm(`次の内容で登録しますか？\n${newBookString}`)) {
        const newBook = await getNewBook();
        const newBookId = await addBook(newBook);
        window.alert(`『${formValueTitle}』を登録しました。`);
        router.push(`/book/${newBookId}`);
      }
    } else {
      if (window.confirm(`次の内容に更新しますか？\n${newBookString}`)) {
        const newBook = await getNewBook();
        await updateBook(props.bookId, newBook);
        window.alert('編集内容を保存しました。');
        router.push(`/book/${props.bookId}`);
      }
    }
    setIsLoading(false);
    return;
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-5 gap-4 align-middle leading-relaxed"
      >
        <BookImage src={formValueImageURL} className="col-span-5" />
        <label htmlFor="image" className="text-right">
          画像
        </label>
        <input
          name="image"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageSelect}
          className="col-span-4 file:button-center file:py-0 file:sm:mr-1"
        />

        <label htmlFor="isbn" className="text-right">
          ISBN
        </label>
        <input
          id="isbn"
          type="text"
          value={formValueISBN}
          onChange={e => setISBN(e.target.value)}
          className="col-span-4"
        />

        <label htmlFor="title" className="text-right">
          タイトル
        </label>
        <input
          id="title"
          type="text"
          value={formValueTitle}
          onChange={e => setTitle(e.target.value)}
          required
          className="col-span-4"
        />

        <label htmlFor="memo" className="text-right">
          メモ
        </label>
        <textarea
          id="memo"
          value={formValueMemo}
          onChange={e => setMemo(e.target.value)}
          className="col-span-4"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="col-start-2 col-span-3 button-center"
        >
          {isNew && (isLoading ? '登録中...' : '登録')}
          {!isNew && (isLoading ? '保存中...' : '変更を保存')}
        </button>
      </form>
    </>
  );
}
