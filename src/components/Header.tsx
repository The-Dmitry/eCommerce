import Link from 'next/link';

export default function Header() {
  return (
    <header className='flex place-content-around bg-orange-600 px-3 py-5'>
      <Link href={'/login'}>Login</Link>
      <Link href={'/registration'}>Registration</Link>
      <Link href={'/'}>Main</Link>
    </header>
  );
}
