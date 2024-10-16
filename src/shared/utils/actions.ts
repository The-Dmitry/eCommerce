'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z, ZodFormattedError } from 'zod';
import LoginResponse from '../models/LoginResponse';
import loginSchema from './loginSchema';

type Credentials = z.infer<typeof loginSchema>;

interface AuthResult {
  auth?: string;
  credentials: ZodFormattedError<Credentials>;
}

export default async function authQuery(
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
  const result: LoginResponse = await response.json();
  console.log(result);

  if (!('access_token' in result)) {
    return { auth: result.message, credentials: { _errors: [] } };
  }
  const { access_token, refresh_token, expires_in } = result;
  cookies().set('access_token', access_token, { maxAge: expires_in });
  cookies().set('refresh_token', refresh_token, { maxAge: 60 * 60 * 24 * 30 });
  redirect('/');
}
