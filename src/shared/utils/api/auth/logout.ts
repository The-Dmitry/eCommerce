'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function logOut(needRedirect?: boolean) {
  const cookieStore = cookies();

  cookieStore.getAll().forEach((cookie) => {
    cookieStore.set({
      name: cookie.name,
      value: '',
      expires: new Date(0),
      path: '/',
    });
  });
  if (needRedirect) {
    redirect('/');
  }
}
