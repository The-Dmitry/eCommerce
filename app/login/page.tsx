import LoginForm from '@/src/features/login-form';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function Login() {
  return (
    <div className='flex h-dvh items-center justify-center bg-slate-600'>
      <LoginForm />;
    </div>
  );
}
