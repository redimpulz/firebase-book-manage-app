import BookForm from '@/components/BookForm';
import BackHomeButton from '@/components/BackHomeButton';

export default function BookNew() {
  return (
    <>
      <h2 className="my-6 sm:my-8 text-3xl sm:text-4xl font-bold">本の登録</h2>
      <BookForm type="new" />
      <p className="my-6 text-right">
        <BackHomeButton />
      </p>
    </>
  );
}
