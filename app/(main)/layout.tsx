import Header from '@/src/widgets/Header';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className='mx-auto flex w-full max-w-screen-xl flex-auto flex-col gap-4 p-4'>
        {children}
      </main>
      <footer className='border-t-2 border-orange-500 p-4 text-center'>
        Footer
      </footer>
    </>
  );
}
