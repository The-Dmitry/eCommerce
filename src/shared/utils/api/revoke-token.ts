'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function revokeToken() {
  try {
    const token = btoa(
      [process.env.CLIENT_ID, process.env.CLIENT_SECRET].join(':')
    );
    const refreshToken = cookies().get('refresh_token');
    const URL = `${process.env.AUTH_URL}/oauth//token/revoke?token=${refreshToken?.value}&token_type_hint={refresh_token}`;
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    if (!response.ok) {
      redirect('/login');
    }
    return response.ok;
  } catch {
    return false;
  }
}
