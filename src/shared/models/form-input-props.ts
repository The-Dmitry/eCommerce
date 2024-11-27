import { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

export default interface FormInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  text?: string;
  labelProps?: HTMLAttributes<HTMLLabelElement>;
  hasError?: boolean;
  children?: ReactNode | string;
}
