import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import getAnonymousToken from './get-anonymous-token';
import saveAuthToken from './save-auth-token';

export default async function revokeToken() {
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
    const data = await getAnonymousToken();
    if ('access_token' in data) {
      saveAuthToken(data);
    } else {
      redirect('/login');
    }
  }
}
