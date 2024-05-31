import firebaseApp from './firebaseApp';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  type NextOrObserver,
  type User,
  type AuthError
} from 'firebase/auth';
export type { AuthError };

export const auth = getAuth(firebaseApp);

export type AuthKey = Readonly<{
  email: string;
  password: string;
}>;

export const createUser = async ({ email, password }: AuthKey) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (e) {
    if (!(e instanceof Error)) throw { message: '不明なエラーです。' };

    const { code } = e as AuthError;
    switch (code) {
      case 'auth/email-already-in-use':
        e.message = 'このメールアドレスはすでに登録されています。';
      case 'auth/invalid-email':
        e.message = '有効なメールアドレスを入力してください。';
      case 'auth/operation-not-allowed':
        e.message = 'アカウント登録は許可されていません。';
      case 'auth/weak-password':
        e.message = 'パスワードが脆弱です。';
      default:
        break;
    }
    throw e;
  }
};

export const loginUser = async ({ email, password }: AuthKey) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (e) {
    if (!(e instanceof Error)) throw e;

    const { code } = e as AuthError;
    switch (code) {
      case 'auth/invalid-email':
        e.message = '有効なメールアドレスを入力してください。';
      case 'auth/user-disabled':
        e.message = 'このメールアドレスは使用できません。';
      case 'auth/user-not-found':
        e.message = 'このメールアドレスのユーザーは存在しません。';
      case 'auth/wrong-password':
        e.message = 'パスワードが間違っています。';
      default:
        break;
    }
    throw e;
  }
};

export const getLoginUser = () => auth.currentUser;

export const onLoginUserChanged = (f: NextOrObserver<User>) =>
  onAuthStateChanged(auth, f);

export const logoutUser = () => signOut(auth);
