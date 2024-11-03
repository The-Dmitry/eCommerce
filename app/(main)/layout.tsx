import Header from '../../src/widgets/Header';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className='grow'>{children}</main>
      <footer className='bg-slate-500 p-4 text-center'>Footer</footer>
    </>
  );
}
