import firebaseApp from './firebaseApp';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  type AuthError,
} from 'firebase/auth';

const auth = getAuth(firebaseApp);

type AuthKey = Readonly<{
  email: string,
  password: string
}>;

const errorFunction = ({ code, message }: Partial<AuthError>) => {
  throw {code, message};
}

export const createUser = async ({ email, password }: AuthKey) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    errorFunction(e as AuthError);
  }
};

export const loginUser = async ({ email, password }: AuthKey) => {
  try {
    signInWithEmailAndPassword(auth, email, password);
    return;
  } catch (e) {
    errorFunction(e as AuthError);
  }
};

export const isLogin = () => {
    console.log(auth.currentUser);
  return !!auth.currentUser;
}

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (e) {
    errorFunction(e as AuthError);
  }
};
