import Header from '../../src/widgets/Header';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className='mx-auto w-full max-w-screen-xl flex-auto p-4'>
        {children}
      </main>
      <footer className='bg-slate-500 p-4 text-center'>Footer</footer>
    </>
  );
}
