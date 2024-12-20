import { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

export interface FormInputPropsWithType
  extends InputHTMLAttributes<HTMLInputElement> {
  text?: string;
  labelProps?: HTMLAttributes<HTMLLabelElement>;
  hasError?: boolean;
  children?: ReactNode | string;
  divClassName?: string;
}

type FormInputProps = Omit<FormInputPropsWithType, 'type'>;

export default FormInputProps;
