import Link from 'next/link';
import AccountButton from '../features/account-button';

export default function Header() {
  return (
    <header className='flex place-content-around bg-orange-600 px-3 py-5'>
      <Link href={'/login'}>Login</Link>
      <Link href={'/signup'}>Registration</Link>
      <Link href={'/'}>Main</Link>
      <AccountButton />
    </header>
  );
}
