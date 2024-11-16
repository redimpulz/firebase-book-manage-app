import { ButtonHTMLAttributes, Children } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export default function Button({ isLoading, ...rest }: Props) {
  // memo : loadingを入れたい
  return (
    <button
      className="bg-blue-500 text-white font-bold text-sm py-1 px-2 rounded-full  hover:bg-blue-700 hover:scale-105"
      {...rest}
    >{isLoading ? ( <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
    </svg>) :rest.children}</button>
  );
}
