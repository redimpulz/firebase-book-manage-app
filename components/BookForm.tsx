'use client';
import { useRouter } from 'next/navigation';
import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent
} from 'react';

import { addDoc, doc, collection, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { firestore } from '@/firebase/firestore';
import { storage } from '@/firebase/storage';
import { Book } from '@/types';

import { AuthContext } from '@/provider/AuthContext';

import BookImage from './BookImage';

type Props = { book?: Book };

export default function BookForm({ book }: Props) {
  const { push } = useRouter();

  const { user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState('');
  const [ISBN, setISBN] = useState('');
  const [memo, setMemo] = useState('');

  const isNew = !book;

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setISBN(book.isbn || '');
      setMemo(book.memo || '');
      setImageUrl(book.image || '');
    }
  }, [book]);

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const imageFile = e.target.files ? e.target.files[0] : null;
    if (imageFile) {
      setImage(imageFile);
      setImageUrl(URL.createObjectURL(imageFile));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    let uploadImageUrl = '';
    let bookId = book?.id;
    try {
      if (image) {
        const imagePath = `images/${Date.now()}`;
        await uploadBytes(ref(storage, imagePath), image);
        uploadImageUrl = await getDownloadURL(ref(storage, imagePath));
      }
      if (isNew) {
        const doc = await addDoc(collection(firestore, 'books'), {
          uid: user?.uid,
          title: title,
          image: uploadImageUrl,
          isbn: ISBN,
          memo: memo
        });
        bookId = doc.id;
      } else {
        await updateDoc(doc(firestore, 'books', book.id), {
          title: title,
          image: uploadImageUrl || book.image,
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
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-5 gap-4 align-middle leading-relaxed"
      >
        <BookImage src={imageUrl || '/200x283.png'} className="col-span-5" />
        <label htmlFor="image" className="text-right">
          画像
        </label>
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="col-span-4 file:button-center file:py-0 file:sm:mr-1"
        />

        <label htmlFor="title" className="text-right">
          タイトル
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="col-span-4"
        />

        <label htmlFor="isbn" className="text-right">
          ISBN
        </label>
        <input
          id="isbn"
          type="text"
          value={ISBN}
          onChange={e => setISBN(e.target.value)}
          className="col-span-4"
        />

        <label htmlFor="memo" className="text-right">
          メモ
        </label>
        <textarea
          id="memo"
          value={memo}
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
