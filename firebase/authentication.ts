'use client';
import firebaseApp from './firebaseApp';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  type AuthError,
  type NextOrObserver,
  type User
} from 'firebase/auth';

const auth = getAuth(firebaseApp);

export type AuthKey = Readonly<{
  email: string;
  password: string;
}>;

export const createUser = async ({ email, password }: AuthKey) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    throw e as AuthError;
  }
};

export const loginUser = async ({ email, password }: AuthKey) => {
  try {
    signInWithEmailAndPassword(auth, email, password);
    return;
  } catch (e) {
    throw e as AuthError;
  }
};

export const getLoginUser = () => auth.currentUser;

export const onLoginUserChanged = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (e) {
    throw e as AuthError;
  }
};
