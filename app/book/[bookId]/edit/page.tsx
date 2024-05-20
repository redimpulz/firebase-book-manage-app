import BookForm from "@/components/BookForm";
import BackHomeButton from "@/components/BackHomeButton";

export default function BookEdit({params}: {params: {bookId: string}}) {
  return (
    <>
      <h2 className="my-6 sm:my-8 text-3xl sm:text-4xl font-bold">本の編集</h2>
      <BookForm type="edit" bookId={params.bookId} />
      <p className="my-6 text-right">
        <BackHomeButton />
      </p>
    </>
  );
}
