import { getUserData } from '@/app/actions';
import Link from 'next/link';
import LogoutButton from './logout-button';

export default async function UserNavigation() {
  const data = await getUserData();
  const isRegisteredUser = data && 'firstName' in data;

  return (
    <div className='flex gap-2'>
      {isRegisteredUser ? (
        <>
          <p>
            {data.firstName[0].toUpperCase()}. {data.lastName[0].toUpperCase()}.
          </p>
          <LogoutButton />
        </>
      ) : (
        <>
          <Link href={'/login'}>Login</Link>
          <Link href={'/signup'}>Registration</Link>
        </>
      )}
      <Link href={'/cart'}>Cart</Link>
    </div>
  );
}
