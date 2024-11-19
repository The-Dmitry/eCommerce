import { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | string;
}

export default function Button({ children, className, ...rest }: Props) {
  return (
    <button
      className={twMerge(
        'w-fit rounded-md bg-orange-500 px-6 py-1 font-bold text-black transition-all hover:bg-orange-400 disabled:sepia',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
