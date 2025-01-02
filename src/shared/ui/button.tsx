import Link, { LinkProps } from 'next/link';
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'button';
}

interface CustomLink
  extends LinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  variant: 'link';
}

type Props = (ButtonProps | CustomLink) & { children?: React.ReactNode };

function isButtonProps(props: Props): props is ButtonProps {
  return props.variant === 'button';
}

export default function Button(props: Props) {
  const { children, className } = props;
  const cssNames = twMerge(
    'flex w-fit select-none items-center justify-center rounded-md bg-orange-500 px-6 py-1 text-center font-bold text-black transition-all hover:bg-orange-400 disabled:cursor-not-allowed disabled:sepia',
    className
  );

  return isButtonProps(props) ? (
    <button {...props} className={cssNames}>
      {children}
    </button>
  ) : (
    <Link {...props} className={cssNames}>
      {children}
    </Link>
  );
}
