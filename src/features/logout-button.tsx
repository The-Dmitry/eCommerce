'use client';

import { logOut } from '@/app/actions';
import { CiLogout } from 'react-icons/ci';
import { LinkProps } from '../shared/models/link-props';

interface Props extends LinkProps {
  className?: string;
}

export default function LogoutButton({ icon, className }: Props) {
  return (
    <button className={className} onClick={async () => await logOut()}>
      {icon ? <CiLogout className='text-4xl' title='Logout' /> : 'Logout'}
    </button>
  );
}
