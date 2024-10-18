import { AuthError } from '../models/AuthResponse';
import revokeToken from './revoke-token';

export default async function baseFetch<T extends Record<string, string>>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T | AuthError> {
  const request = await fetch(input, init);
  const result = await request.json();
  if (result.error && result.statusCode === 401) {
    await revokeToken();
  } else {
    return result;
  }
  const repeatedRequest = await fetch(input, init);
  const repeatedResult = await repeatedRequest.json();
  return repeatedResult;
}
