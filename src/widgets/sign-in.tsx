import Logo from '@entities/logo';
import LoginForm from '@features/login-form';
import { Routes } from '@shared/constants/routes';
import Link from 'next/link';

export default function SignIn() {
  return (
    <div className='flex flex-col items-center gap-4 rounded-xl sm:bg-neutral-900/75 sm:p-8'>
      <Logo size={70} />
      <LoginForm />
      <div className='flex gap-1 text-orange-500'>
        <span>No account yet?</span>
        <Link
          href={Routes.SING_UP}
          className='text-white underline transition-all hover:text-orange-300'
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
