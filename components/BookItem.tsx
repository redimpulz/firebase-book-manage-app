import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import { Book } from '@/types';

type Props = { book: Book; onClickDelete: (book: Book) => void };

export default function BookItem({ book, onClickDelete }: Props) {
  return (
    <li className="flex flex-col items-center py-2 gap-2 bg-gray-300">
      <span className="mr-2">{book.title}</span>
      <Image
        src={book.image || '/200x283.png'}
        alt={book.title}
        width={200}
        height={283}
      />
      <div className="flex gap-1">
        <Link href={`/book/${book.id}`}>
          <Button>詳細</Button>
        </Link>
        <Button onClick={() => onClickDelete(book)}>削除</Button>
      </div>
    </li>
  );
}
