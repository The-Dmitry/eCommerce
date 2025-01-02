'use server';

import { BASE_URL } from '@shared/constants/base-url';
import AuthResult from '@shared/models/AuthResult';
import { NewCustomer } from '@shared/models/NewCustomer';
import { ResponseError } from '@shared/models/ResponseError';
import fetchWithToken from '@shared/utils/api/fetch-with-token';
import loginUser from '@shared/utils/api/login-user';
import signupSchema, { SignupData } from '@shared/utils/schemas/signupShema';
import validateForm from '@shared/utils/validate-form';
import { redirect } from 'next/navigation';

export default async function createUser(
  _: unknown,
  data: FormData
): Promise<AuthResult<SignupData>> {
  const validationResult = await validateForm(signupSchema, data);
  if (!validationResult.success) {
    return { credentials: validationResult.error.format() };
  }
  const { email, firstName, lastName, password } = validationResult.data;
  const result = await fetchWithToken<NewCustomer<ResponseError>>(
    `${BASE_URL.HOST}/customers`,
    {
      method: 'POST',
      body: JSON.stringify({ email, firstName, lastName, password }),
    }
  );

  if ('customer' in result) {
    const success = await loginUser(email, password);
    if (success) redirect('/');
  }
  return { auth: result.message, credentials: { _errors: [] } };
}
