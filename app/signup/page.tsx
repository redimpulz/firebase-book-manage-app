'use client';
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';

import Button from '@/components/Button';

export default function Page() {
  const { push } = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      push('/');
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  };

  return (
    <>
      <h2>新規登録</h2>
      <form onSubmit={handleSignUp} className="flex flex-col gap-1">
        <input
          name="email"
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={e => setPassword(e.target.value)}
          minLength={8}
          required
        />

        <Button>新規登録</Button>
        <Link href="/login">ログイン</Link>
      </form>
    </>
  );
}
