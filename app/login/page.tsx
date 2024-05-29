'use client';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createUser, loginUser, type AuthKey } from '@/firebase/authentication';
import type { AuthError } from 'firebase/auth';

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [formValueEmail, setFormValueEmail] = useState<string>('');
  const [formValuePassword, setFormValuePassword] = useState<string>('');

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const authKey = {
      email: formValueEmail || '',
      password: formValuePassword || ''
    } satisfies AuthKey;

    try {
      await loginUser(authKey);
      window.alert('ログインに成功しました。蔵書一覧ページに移動します');
      router.push('/');
    } catch (e) {
      const { code, message } = e as AuthError;
      if (code === 'auth/invalid-email') {
        setError('有効なメールアドレスを入力してください。');
      } else if (code === 'auth/wrong-password') {
        setError('パスワードが間違っています。');
      } else if (code === 'auth/user-disabled') {
        setError('このメールアドレスは使用できません。');
      } else if (code === 'auth/user-not-found') {
        if (window.confirm('ユーザー登録しますか？')) {
          await _signUp(authKey);
        }
      } else {
        setError(message);
      }
    }
  };

  const _signUp = async ({ email, password }: AuthKey) => {
    setError(null);
    try {
      await createUser({ email, password });
      window.alert(`${email} を登録しました。蔵書一覧ページに移動します。`);
      router.push('/');
    } catch (e) {
      const { code, message } = e as AuthError;
      if (code === 'auth/invalid-email') {
        setError('有効なメールアドレスを入力してください。');
      } else if (code === 'auth/weak-password') {
        setError('パスワードが脆弱です。');
      } else {
        setError(message);
      }
    }
  };

  return (
    <>
      <h2 className="text-3xl sm:text-4xl font-bold my-6 sm:my-8">ログイン</h2>
      <form
        onSubmit={handleLogin}
        className="grid grid-cols-2 gap-4 align-middle max-w-96 mx-auto text-2xl"
      >
        {error && <div className="text-red text-base">{error}</div>}
        <input
          name="email"
          type="email"
          placeholder="メールアドレス"
          value={formValueEmail}
          onChange={e => setFormValueEmail(e.target.value)}
          required
          className="col-span-2 rounded-lg ps-1 py-2"
        />

        <input
          name="password"
          type="password"
          placeholder="パスワード"
          value={formValuePassword}
          onChange={e => setFormValuePassword(e.target.value)}
          minLength={8}
          required
          className="col-span-2 rounded-lg ps-1 py-2"
        />

        <button type="submit" className="button-center w-full">
          ログイン
        </button>

        {/* <button
          type="submit"
          onClick={handleSignUp}
          className="button-center w-full">
          新規登録
        </button> */}
      </form>
    </>
  );
}
