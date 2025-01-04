import PersonalNavigation from '@features/personal/personal-navigation';
import { IoPersonCircleOutline } from 'react-icons/io5';

export default function PersonalLayout({
  children,
  isHardNavigation = false,
}: Readonly<{
  children: React.ReactNode;
  isHardNavigation?: boolean;
}>) {
  return (
    <div className='mx-auto w-full text-orange-500 sm:max-w-3xl'>
      <div className='w-full max-w-3xl rounded-2xl p-3 shadow-lg sm:bg-neutral-900/80 sm:p-8'>
        <div className='mb-8 flex items-center space-x-4'>
          <div className='hidden size-16 items-center justify-center rounded-full bg-current sm:flex'>
            <IoPersonCircleOutline className='text-5xl text-white' />
          </div>
          <div>
            <h1 className='text-2xl font-bold'>Account</h1>
            <p className='text-sm text-orange-400'>
              Personal data and security management
            </p>
          </div>
        </div>

        <div className='mb-8'>
          <PersonalNavigation isHardNavigation={isHardNavigation} />
        </div>

        <div className='mt-6'>{children}</div>
      </div>
    </div>
  );
}
