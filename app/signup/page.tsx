import Logo from '@/src/entities/logo';
import SignupForm from '@/src/features/signup-form';
import { Routes } from '@/src/shared/constants/routes';

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function SignUp() {
  return (
    <div className='flex flex-auto flex-col items-center justify-center gap-8 p-4'>
      <div className='flex flex-col items-center gap-4 rounded-xl sm:bg-neutral-900/75 sm:p-8'>
        <Logo size={70} />
        <SignupForm />
        <div className='flex gap-1 text-orange-500'>
          <span>Already have an account?</span>
          <Link
            href={Routes.SIGN_IN}
            className='text-white underline transition-all hover:text-orange-300'
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
