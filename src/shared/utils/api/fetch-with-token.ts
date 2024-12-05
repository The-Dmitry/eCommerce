import { cookies } from 'next/headers';
import { COOKIES_DATA } from '../../constants/cookies-data';
import { ResponseError } from '../../models/ResponseError';
import saveAuthToken from '../save-auth-token';
import getAnonymousToken from './get-anonymous-token';

export default async function fetchWithToken<T>(
  input: RequestInfo | URL,
  options: RequestInit = {},
  reserveAction?: () => Promise<void | boolean>
): Promise<T | ResponseError> {
  let token = cookies().get(COOKIES_DATA.ACCESS_TOKEN);
  if (!token?.value) {
    const newTokens = await getAnonymousToken();
    if ('access_token' in newTokens) {
      saveAuthToken(newTokens);
      token = cookies().get(COOKIES_DATA.ACCESS_TOKEN);
    }
  }
  options.headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token!.value}`,
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
