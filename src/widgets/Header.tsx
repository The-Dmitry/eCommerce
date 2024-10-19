import Link from 'next/link';
import UserNavigation from '../features/user-navigation';

export default function Header() {
  return (
    <header className='flex place-content-around bg-orange-600 px-3 py-5'>
      <Link href={'/'}>Main</Link>
      <Link href={'/catalog'}>Catalog</Link>
      <UserNavigation />
    </header>
  );
}
