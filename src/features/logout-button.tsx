'use client';

import { logOut } from '@/app/actions';

export default function LogoutButton() {
  return <button onClick={async () => await logOut()}>LogOut</button>;
}
