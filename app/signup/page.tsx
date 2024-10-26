import SignupForm from '@/src/features/signup-form';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function SignUp() {
  return (
    <div className='flex h-dvh items-center justify-center bg-slate-600'>
      <SignupForm />
    </div>
  );
}
