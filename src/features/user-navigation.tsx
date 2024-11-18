import { getUserData } from '@/app/actions';
import Link from 'next/link';
import { Routes } from '../shared/constants/routes';
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
          <Link href={Routes.SIGN_IN}>Sign In</Link>
          <Link href={Routes.SING_UP}>Sign Up</Link>
        </>
      )}
      <Link href={Routes.CART}>Cart</Link>
    </div>
  );
}
