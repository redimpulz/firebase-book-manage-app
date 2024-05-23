import Link from 'next/link';

export default function BackHomeButton(){
  return (
    <Link href="/" className="button-back">
      一覧に戻る
    </Link>
  );
}