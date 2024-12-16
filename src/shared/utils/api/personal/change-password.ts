'use server';

import { getUserData } from '@/app/actions';
import { BASE_URL } from '@/src/shared/constants/base-url';
import UserData from '@/src/shared/models/UserData';
import { ZodFormattedError } from 'zod';
import passwordChangeScheme, {
  ChangePasswordData,
} from '../../schemas/password-change-scheme';
import validateForm from '../../validate-form';
import fetchWithToken from '../fetch-with-token';
import loginUser from '../login-user';

interface ChangePasswordResult {
  success?: boolean;
  auth?: string;
  credentials: ZodFormattedError<ChangePasswordData>;
}

export default async function changePassword(
  _: unknown,
  data: FormData
): Promise<ChangePasswordResult> {
  const [collection, validationResult] = await validateForm(
    passwordChangeScheme,
    data
  );
  if (!validationResult.success) {
    return { credentials: validationResult.error.format() };
  }
  const { currentPassword, newPassword } = collection as ChangePasswordData;
  const userData = await getUserData();
  if ('errors' in userData) {
    return { auth: userData.message, credentials: { _errors: [] } };
  }
  const { id, version } = userData;
  const URL = `${BASE_URL.HOST}/customers/password`;
  const result = await fetchWithToken<UserData>(URL, {
    method: 'POST',
    body: JSON.stringify({ id, version, currentPassword, newPassword }),
  });
  if ('id' in result) {
    await loginUser(result.email, newPassword);
  }

  return 'errors' in result
    ? { auth: result.message, credentials: { _errors: [] } }
    : { auth: '', credentials: { _errors: [] }, success: true };
}
