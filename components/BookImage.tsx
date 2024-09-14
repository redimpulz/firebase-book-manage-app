import Image from 'next/image';

type Props = {
  src: string;
};

export default function BookImage({ src }: Props) {
  return (
    <div>
      <Image src={src} alt="書影" width={200} height={283} />
    </div>
  );
}
