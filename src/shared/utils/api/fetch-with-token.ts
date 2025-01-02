'use server';

import getDataFromStorage from '@shared/utils/get-data-from-storage';
import { COOKIES_DATA } from '../../constants/cookies-data';
import { ResponseError } from '../../models/ResponseError';
import getAnonymousToken from './get-anonymous-token';

export default async function fetchWithToken<T>(
  input: RequestInfo | URL,
  options: RequestInit = {},
  reserveAction?: () => Promise<void | boolean>
): Promise<T | ResponseError> {
  let token = getDataFromStorage(COOKIES_DATA.ACCESS_TOKEN);

  if (!token) {
    const anonymous = await getAnonymousToken();
    if ('access_token' in anonymous) {
      token = anonymous.access_token;
    } else {
      throw new Error('Unable to retrieve token');
    }
  }
  options.headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };
  const request = await fetch(input, options);
  const result = await request.json();
  if (result.error && result.statusCode === 401) {
    if (reserveAction) {
      await reserveAction();
    }
  } else {
    return result;
  }

  const repeatedRequest = await fetch(input, options);
  const repeatedResult: T = await repeatedRequest.json();
  return repeatedResult;
}
