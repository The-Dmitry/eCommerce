import { getUserData } from '@/app/actions';
import Link from 'next/link';
import { Routes } from '../shared/constants/routes';
import { LinkProps } from '../shared/models/link-props';
import LogoutButton from './logout-button';
import PersonalLink from './personal-link';

interface Props extends LinkProps {
  data: Awaited<ReturnType<typeof getUserData>>;
  className?: string;
}

export default async function UserNavigation({
  data,
  className,
  icon = false,
}: Props) {
  const isRegisteredUser = data && 'firstName' in data;

  return (
    <>
      <Link className={className} href={Routes.MAIN}>
        Main
      </Link>
      <Link className={className} href={Routes.CATALOG}>
        Catalog
      </Link>
      {isRegisteredUser ? (
        <>
          <PersonalLink className={className} data={data} icon={icon} />
          <LogoutButton className={className} icon={icon} />
        </>
      ) : (
        <>
          <Link className={className} href={Routes.SIGN_IN}>
            Sign In
          </Link>
          <Link className={className} href={Routes.SING_UP}>
            Sign Up
          </Link>
        </>
      )}
    </>
  );
}
