'use server';

import { BASE_URL } from '@shared/constants/base-url';
import { COOKIES_DATA } from '@shared/constants/cookies-data';
import REGISTERED_USER from '@shared/constants/user-type';
import { ResponseError } from '@shared/models/ResponseError';
import UserData from '@shared/models/UserData';
import fetchWithToken from '@shared/utils/api/fetch-with-token';
import revokeToken from '@shared/utils/api/revoke-token';
import { cookies } from 'next/headers';

export default async function getUserData(): Promise<UserData | ResponseError> {
  const user = cookies().get(COOKIES_DATA.USER_TYPE)?.value === REGISTERED_USER;
  if (!user) {
    return { message: 'User is not authorized', statusCode: 401, errors: [] };
  }
  const URL = `${BASE_URL.HOST}/me`;
  const result = await fetchWithToken<UserData>(
    URL,
    {
      method: 'GET',
      cache: 'no-store',
    },
    revokeToken
  );
  return result;
}
