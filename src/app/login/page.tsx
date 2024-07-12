'use client';
import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@/firebase';

export default function Page() {
  const { push } = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      push('/');
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  };

  return (
    <>
      <h2 className="text-3xl sm:text-4xl font-bold my-6 sm:my-8">ログイン</h2>
      <form
        onSubmit={handleLogin}
        className="grid grid-cols-2 gap-4 max-w-96 mx-auto text-2xl"
      >
        <input
          name="email"
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="col-span-2 py-2"
        />

        <input
          name="password"
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={e => setPassword(e.target.value)}
          minLength={8}
          required
          className="col-span-2 py-2"
        />

        <button type="submit" className="button-center w-full">
          ログイン
        </button>
        <Link href="/signup" className="button-link">
          新規登録
        </Link>
      </form>
    </>
  );
}
