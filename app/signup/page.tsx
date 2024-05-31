'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useState, type FormEvent } from 'react';
import { AuthContext } from '@/components/AuthContext';
import type { AuthError, AuthKey } from '@/firebase/authentication';

export default function SignUp() {
  const router = useRouter();
  const { signUp } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const [formValueEmail, setFormValueEmail] = useState('');
  const [formValuePassword, setFormValuePassword] = useState('');

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const authKey = {
      email: formValueEmail,
      password: formValuePassword
    } satisfies AuthKey;

    try {
      await signUp(authKey);
      window.alert(
        `${authKey.email} を登録しました。蔵書一覧ページに移動します。`
      );
      router.push('/');
    } catch (e) {
      setError((e as AuthError).message);
    }
  };

  return (
    <>
      <h2 className="text-3xl sm:text-4xl font-bold my-6 sm:my-8">新規登録</h2>
      <form
        onSubmit={handleSignUp}
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
          新規登録
        </button>
        <Link href="/login" className="w-full text-center">
          ログイン🔗
        </Link>
      </form>
    </>
  );
}
