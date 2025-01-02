import { cookies } from 'next/headers';
import Link from 'next/link';
import { COOKIES_DATA } from '../shared/constants/cookies-data';
import { Routes } from '../shared/constants/routes';
import { LinkProps } from '../shared/models/link-props';
import LogoutButton from './logout-button';
import PersonalLink from './personal-link';

interface Props extends LinkProps {
  className?: string;
}

export default async function UserNavigation({
  className,
  icon = false,
}: Props) {
  const isRegisteredUser = cookies().get(COOKIES_DATA.USER_TYPE)?.value;

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
          <PersonalLink className={className} icon={icon} />
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
