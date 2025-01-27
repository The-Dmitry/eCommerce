'use client';

import logOut from '@shared/utils/api/auth/logout';
import { usePathname } from 'next/navigation';
import { CiLogout } from 'react-icons/ci';
import { Routes } from '../shared/constants/routes';
import { LinkProps } from '../shared/models/link-props';

interface Props extends LinkProps {
  className?: string;
}

export default function LogoutButton({ icon, className }: Props) {
  const pathName = usePathname();
  const redirect = pathName.includes(Routes.PERSONAL);
  return (
    <button className={className} onClick={async () => await logOut(redirect)}>
      {icon ? <CiLogout className='text-4xl' title='Logout' /> : 'Logout'}
    </button>
  );
}
