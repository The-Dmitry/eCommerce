import { FormHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import DateInput from './date-input';
import Error from './error';
import PasswordInput from './password-input';
import TextInput from './text-input';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: string | ReactNode;
}

export default function Form({ children, className, ...rest }: FormProps) {
  return (
    <form
      className={twMerge('flex flex-col items-center', className)}
      {...rest}
    >
      {children}
    </form>
  );
}

Form.Text = TextInput;
Form.Password = PasswordInput;
Form.Error = Error;
Form.Date = DateInput;
