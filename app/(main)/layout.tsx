import Header from '@/src/widgets/Header';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export default function MainLayout({
  children,
  personal,
}: Readonly<{
  children: React.ReactNode;
  personal: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className='mx-auto flex w-full max-w-screen-xl flex-auto flex-col gap-4 p-4'>
        {children}
        {personal}
      </main>
      <footer className='flex justify-center py-2'>
        <Link
          href={'https://github.com/The-Dmitry'}
          target='_blank'
          title='My Github'
        >
          <FaGithub className='cursor-pointer text-5xl text-orange-500 transition-all hover:text-orange-400' />
        </Link>
      </footer>
    </>
  );
}
