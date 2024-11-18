import { ButtonHTMLAttributes, ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { twMerge } from 'tailwind-merge';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: ReactNode | string;
}

export default function SubmitButton({ children, className, ...rest }: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending}
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
