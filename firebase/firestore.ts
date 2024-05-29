import firebaseApp from './firebaseApp';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { removeBookImage } from './storage';

const firestore = getFirestore(firebaseApp);
const booksCollection = collection(firestore, '/books');

export type Book = {
  image?: string;
  isbn?: string;
  title: string;
  memo?: string;
};

export const addBook = async (book: Readonly<Book>) => {
  try {
    const bookId = (await addDoc(booksCollection, book)).id;
    return bookId;
  } catch (e) {
    console.error('! Error adding document: ', e);
  }
};

export const getBook = async (bookId: string) => {
  try {
    const querySnapshot = await getDoc(doc(firestore, 'books', bookId));
    if (querySnapshot.exists()) {
      return querySnapshot.data() as Book;
    } else {
      console.error('! Error no such document!');
    }
  } catch (e) {
    console.error('! Error getting document: ', e);
  }
};

export const getAllBooks = async () => {
  try {
    const querySnapshot = await getDocs(booksCollection);
    return querySnapshot;
  } catch (e) {
    console.error('! Error getting documents: ', e);
  }
};

export const updateBook = async (bookId: string, book: Partial<Book>) => {
  try {
    await updateDoc(doc(firestore, 'books', bookId), book);
  } catch (e) {
    console.error('! Error updating document: ', e);
  }
};

export const removeBook = async (bookId: string, book: Readonly<Book>) => {
  try {
    if (book.image) await removeBookImage(book.image);
    await deleteDoc(doc(firestore, 'books', bookId));
  } catch (e) {
    console.error('! Error deleting document: ', e);
  }
};
