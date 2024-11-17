import Logo from '@/src/entities/logo';
import LoginForm from '@/src/features/login-form';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function Login() {
  return (
    <div className='flex h-dvh flex-col items-center justify-center gap-8 p-4'>
      <Logo size={70} />
      <LoginForm />
    </div>
  );
}
