'use server';

import AuthResult from '@shared/models/AuthResult';
import loginUser from '@shared/utils/api/login-user';
import loginSchema, { LoginData } from '@shared/utils/schemas/loginSchema';
import validateForm from '@shared/utils/validate-form';
import { redirect } from 'next/navigation';

export async function authQuery(
  _: unknown,
  data: FormData
): Promise<AuthResult<LoginData>> {
  const validationResult = await validateForm(loginSchema, data);
  if (!validationResult.success) {
    return { credentials: validationResult.error.format() };
  }
  const { email, password } = validationResult.data;
  const success = await loginUser(email, password);
  if (typeof success === 'boolean') redirect('/');
  return success;
}
