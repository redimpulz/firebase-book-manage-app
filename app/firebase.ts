// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const firestore = getFirestore(firebaseApp);
const booksCollection = collection(firestore, '/books');

export type Book = {
  isbn?: string;
  title: string;
  memo?: string;
}

const addBook = async (book: Readonly<Book>) => {
  try {
    const bookId = (await addDoc(booksCollection, book)).id;
    return bookId;
  } catch (e) {
    console.error('! Error adding document: ', e);
  }
}

const getBook = async (bookId: string) => {
  try {
    const querySnapshot = await getDoc(doc(firestore, 'books', bookId));
    if (querySnapshot.exists()){
      return querySnapshot.data() as Book;
    } else {
      console.error('! Error no such document!');
    }
  } catch (e) {
    console.error('! Error getting document: ', e);
  }
}

const getAllBooks = async () => {
  try {
    const querySnapshot = await getDocs(booksCollection);
    return querySnapshot;
  } catch (e) {
    console.error('! Error getting documents: ', e);
  }
}

const updateBook = async (bookId: string, book: Readonly<Partial<Book>>) => {
  try {
    await updateDoc(doc(firestore, 'books', bookId), book);
  } catch (e) {
    console.error('! Error updating document: ', e);
  }
}

const removeBook = async (bookId: string) => {
  try {
    await deleteDoc(doc(firestore, 'books', bookId));
  } catch (e) {
    console.error('! Error deleting document: ', e);
  }
}

export { firebaseApp, firestore, addBook, getBook, getAllBooks, updateBook, removeBook };