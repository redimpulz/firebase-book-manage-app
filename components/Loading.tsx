import clsx from 'clsx';

type Props = React.HTMLAttributes<HTMLDivElement>;

export default function Loading({ className, ...rest }: Props) {
  return (
    <div
      className={clsx(
        'animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent text-center',
        className
      )}
      {...rest}
    />
  );
}
