import PersonalNavigation from '@/src/features/personal/personal-navigation';
import { IoPersonCircleOutline } from 'react-icons/io5';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='min-h-screen'>
      <div className='mx-auto max-w-3xl px-4 py-12 text-orange-500'>
        <div className='rounded-2xl bg-neutral-900 p-8 shadow-lg'>
          <div className='mb-8 flex items-center space-x-4'>
            <div className='flex size-16 items-center justify-center rounded-full bg-current'>
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
