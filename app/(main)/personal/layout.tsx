import PersonalNavigation from '@/src/features/personal/personal-navigation';
import { IoPersonCircleOutline } from 'react-icons/io5';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-full items-center justify-center lg:block'>
      <div className='mx-auto w-full text-orange-500 sm:max-w-3xl'>
        <div className='w-full max-w-3xl rounded-2xl bg-neutral-900 p-3 shadow-lg sm:p-8'>
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
            <PersonalNavigation />
          </div>

          <div className='mt-6'>{children}</div>
        </div>
      </div>
    </div>
  );
}
