import { ButtonHTMLAttributes} from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export default function Button(props : Props) {
  return (
    <button
      className="bg-blue-500 text-white font-bold text-sm py-1 px-2 rounded-full  hover:bg-blue-700 hover:scale-105"
      {...props}
    ></button>
  );
}
