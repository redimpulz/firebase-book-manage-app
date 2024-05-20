import Link from 'next/link';

export default function BackHomeButton(){
  return (
    <Link
      href="/"
      className="bg-image-transparent after:link-back-icon text-base sm:text-lg"
    >
        一覧に戻る
    </Link>
  );
}