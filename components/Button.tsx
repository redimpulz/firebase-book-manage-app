type Props = {
  type?: 'button' | 'submit' | 'reset';
  buttonText?: string;
  handleClick?: () => void;
  disabled?: boolean;
};

export default function Button({ buttonText,handleClick,type,disabled }: Props) {
  return (
    <div>
      <button type={type} onClick={handleClick} disabled = {disabled} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full  hover:bg-blue-700 hover:scale-105" >{buttonText}</button>
    </div>
  );
}