import { ParamHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ParamHTMLAttributes<HTMLParagraphElement> {
  text?: string;
}

export default function Error({ text, className, ...rest }: Props) {
  return text ? (
    <p
      className={twMerge(
        'box-content w-full text-center text-sm text-red-500',
        className
      )}
      {...rest}
    >
      {text}
    </p>
  ) : null;
}
