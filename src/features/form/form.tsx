import { FormHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import Error from './error';
import PasswordInput from './password-input';
import TextInput from './text-input';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: string | ReactNode;
}

export default function Form({ children, className, ...rest }: FormProps) {
  return (
    <form
      className={twMerge('flex flex-col items-center gap-2', className)}
      {...rest}
    >
      {children}
    </form>
  );
}

Form.Text = TextInput;
Form.Password = PasswordInput;
Form.Error = Error;
