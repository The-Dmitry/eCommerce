import SignIn from '@widgets/sign-in';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function Login() {
  return (
    <div className='flex flex-auto items-center justify-center gap-8 p-4'>
      <SignIn />
    </div>
  );
}
