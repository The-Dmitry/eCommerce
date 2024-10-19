import { redirect } from 'next/navigation';
import { AuthResponse } from '../models/AuthResponse';
import saveAuthToken from './save-auth-token';

export default async function loginUser(email: string, password: string) {
  const token = btoa(
    [process.env.CLIENT_ID, process.env.CLIENT_SECRET].join(':')
  );

  const URL = `${process.env.AUTH_URL}/oauth/${process.env.PROJECT_KEY}/customers/token?grant_type=password&username=${email}&password=${password}`;
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const result: AuthResponse = await response.json();

  if (!('access_token' in result)) {
    return { auth: result.message, credentials: { _errors: [] } };
  }
  saveAuthToken(result);
  redirect('/');
}
