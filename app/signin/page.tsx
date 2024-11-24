import Logo from '@/src/entities/logo';
import LoginForm from '@/src/features/login-form';
import { Routes } from '@/src/shared/constants/routes';

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function Login() {
  return (
    <div className='flex flex-auto flex-col items-center justify-center gap-8 p-4'>
      <Logo size={70} />
      <LoginForm />
      <div className='flex gap-1 text-orange-500'>
        <span>No account yet?</span>
        <Link
          href={Routes.SING_UP}
          className='text-white underline transition-all hover:text-orange-300'
        >
          SIgn Up
        </Link>
      </div>
    </div>
  );
}