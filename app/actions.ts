'use server';

import UserData from '@/src/shared/models/UserData';
import saveAuthToken from '@/src/shared/utils/save-auth-token';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z, ZodFormattedError } from 'zod';
import { AuthResponse } from '../src/shared/models/AuthResponse';
import loginSchema from '../src/shared/utils/loginSchema';

type Credentials = z.infer<typeof loginSchema>;

interface AuthResult {
  auth?: string;
  credentials: ZodFormattedError<Credentials>;
}

export async function authQuery(
  _: unknown,
  data: FormData
): Promise<AuthResult> {
  const obj = Object.fromEntries(data.entries());
  const validationResult = await loginSchema.safeParseAsync(obj);
  if (!validationResult.success) {
    return { credentials: validationResult.error.format() };
  }
  const { email, password } = obj as Credentials;

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

export async function getUserData(): Promise<UserData> {
  const token = cookies().get('access_token');
  const URL = `${process.env.HOST_URL}/${process.env.PROJECT_KEY}/me`;
  const response = await fetch(URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token?.value}`,
      'Content-Type': 'application/json',
    },
  });

  // if (!response.ok) {
  //   return null;
  // }

  const data = await response.json();
  return data;
}

export async function logOut() {
  const cookieStore = cookies();

  cookieStore.getAll().forEach((cookie) => {
    cookieStore.set({
      name: cookie.name,
      value: '',
      expires: new Date(0),
      path: '/',
    });
  });
}
