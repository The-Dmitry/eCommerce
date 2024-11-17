import Link from 'next/link';
import Logo from '../entities/logo';
import UserNavigation from '../features/user-navigation';
import { Routes } from '../shared/constants/routes';

export default function Header() {
  return (
    <header className='flex h-16 shrink-0 place-content-between items-center px-4 text-orange-400'>
      <Logo />
      <nav className='flex gap-3'>
        <Link href={Routes.MAIN}>Main</Link>
        <Link href={Routes.CATALOG}>Catalog</Link>
      </nav>
      <UserNavigation />
    </header>
  );
}
