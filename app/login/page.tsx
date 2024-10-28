'use client';
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@/firebase';

import Button from '@/components/Button';

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
      <h2 className="text-center">ログイン</h2>
  
        <form onSubmit={handleLogin} className="mx-auto w-1/2">
          <input
            name="email"
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full mb-2"
            required
          />
  
          <input
            name="password"
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={8}
            className="w-full mb-2"
            required
          />
  
          <Button buttonText = 'ログイン'/>
        </form>
        <Link href="/signup" className="block text-center mt-2">新規登録</Link>

    </>
  );
}
