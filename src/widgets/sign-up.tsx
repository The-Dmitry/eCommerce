import Logo from '@/src/entities/logo';
import SignupForm from '@/src/features/signup-form';
import { Routes } from '@/src/shared/constants/routes';

import Link from 'next/link';

export default function SignUp() {
  return (
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
  );
}
