import { useContext, useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

import { addDoc, doc, collection, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { firestore, storage } from '@/firebase';
import { AuthContext } from '@/provider/AuthContext';
import { Book } from '@/types';

import BookImage from './BookImage';
import Button from './Button';

type Props = { book?: Book };

export default function BookForm({ book }: Props) {
  const { push } = useRouter();

  const { user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [ISBN, setISBN] = useState('');
  const [memo, setMemo] = useState('');

  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState('');

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
    let bookId = book?.id;
    let uploadImageUrl = '';
    try {
      if (image) {
        const imagePath = `images/${Date.now()}`;
        await uploadBytes(ref(storage, imagePath), image);
        uploadImageUrl = await getDownloadURL(ref(storage, imagePath));
      }
      if (isNew) {
        const doc = await addDoc(collection(firestore, 'books'), {
          title: title,
          isbn: ISBN,
          memo: memo,
          image: uploadImageUrl,
          uid: user?.uid
        });
        bookId = doc.id;
      } else {
        await updateDoc(doc(firestore, 'books', book.id), {
          title: title,
          isbn: ISBN,
          memo: memo,
          image: uploadImageUrl || book.image
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
        <label htmlFor="title">タイトル</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <label htmlFor="image">画像</label>
        <BookImage src={imageUrl || '/200x283.png'} />
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
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

        <Button type="submit" disabled={isLoading}>
          {isNew
            ? isLoading
              ? '登録中...'
              : '登録'
            : isLoading
            ? '保存中...'
            : '変更を保存'}
        </Button>
      </form>
    </>
  );
}
