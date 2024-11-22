import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, ...rest }: Props) {
  return (
    <button
      className={clsx(
        'bg-blue-500 text-white font-bold text-sm py-1 px-2 rounded-full hover:bg-blue-700',
        className
      )}
      {...rest}
    />
  );
}
