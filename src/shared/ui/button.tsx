import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'button';
}

interface CustomLink extends React.ComponentProps<typeof Link> {
  variant: 'link';
  children?: ReactNode;
}

type Props = (ButtonProps | CustomLink) & {
  children: ReactNode;
  className?: string;
};

export default function Button({
  variant = 'button',
  children,
  className,
  ...rest
}: Props) {
  const cssNames = twMerge(
    'flex w-fit select-none items-center justify-center rounded-md bg-orange-500 px-6 py-1 text-center font-bold text-black transition-all hover:bg-orange-400 disabled:cursor-not-allowed disabled:sepia',
    className
  );
  const component = {
    button: (
      <button className={cssNames} {...(rest as Omit<ButtonProps, 'variant'>)}>
        {children}
      </button>
    ),
    link: (
      <Link className={cssNames} {...(rest as Omit<CustomLink, 'variant'>)}>
        {children}
      </Link>
    ),
  }[variant];

  return component;
}
