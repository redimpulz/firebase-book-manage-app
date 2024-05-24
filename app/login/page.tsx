'use client';
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createUser, isLogin, loginUser } from "@/firebase/authentication";

export default function Login() {
  const router = useRouter();
  const [formValueEmail, setFormValueEmail] = useState<string>('');
  const [formValuePassword, setFormValuePassword] = useState<string>('');

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formValueEmail, formValuePassword);

    try {
      await loginUser({
        email: formValueEmail as string,
        password: formValuePassword as string
      });
      router.push('/');
    } catch (e) {
      window.alert(`${e}`);
    }
  };

  // const handleSignUp = async (e: FormEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   console.log(isLogin());

  //   await createUser({
  //     email: formValueEmail as string,
  //     password: formValuePassword as string
  //   });
  //   window.alert(`${formValueEmail}を登録しました`);
  //   router.push('/');
  // }

  return (
    <>
      <h2 className="text-3xl sm:text-4xl font-bold my-6 sm:my-8">ログイン</h2>
      <form
        onSubmit={handleLogin}
        className="grid grid-cols-2 gap-4 align-middle max-w-96 mx-auto text-2xl"
      >
        <input
          name="email"
          type="email"
          placeholder="メールアドレス"
          value={formValueEmail}
          onChange={e => {setFormValueEmail(e.target.value); console.log(formValueEmail);}}
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

        <button
          type="submit"
          className="button-center w-full"
        >
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