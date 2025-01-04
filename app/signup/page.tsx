import SignUp from '@widgets/sign-up';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function Registration() {
  return (
    <div className='flex flex-auto flex-col items-center justify-center gap-8 p-4'>
      <SignUp />
    </div>
  );
}
