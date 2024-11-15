import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export default function Button({ isLoading, ...rest }: Props) {
  // memo : loadingを入れたい
  return (
    <button
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full  hover:bg-blue-700 hover:scale-105"
      {...rest}
    />
  );
}
