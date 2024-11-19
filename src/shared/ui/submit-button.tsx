import { ButtonHTMLAttributes, ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import Button from './button';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: ReactNode | string;
}

export default function SubmitButton({ children, ...rest }: Props) {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' disabled={pending} {...rest}>
      {children}
    </Button>
  );
}
