import Link from 'next/link';
import { useContext } from 'react';
import { signOut } from 'firebase/auth';

import { AuthContext } from '@/provider/AuthContext';
import { auth } from '@/firebase';

import Button from './Button';

export default function AppHeader() {
  const { user } = useContext(AuthContext);
  const isLogin = !!user;
  return (
    <header>
      <h1>
        <Link href="/">Firebase Book Manage App</Link>
      </h1>
      {isLogin && (
        <div>
          {user.email}
          {` / `}
          <Button onClick={() => signOut(auth)}>ログアウト</Button>
        </div>
      )}
    </header>
  );
}
