'use server';

import { BASE_URL } from '../../constants/base-url';
import { AuthResponse } from '../../models/AuthResponse';

export default async function getAnonymousToken(): Promise<AuthResponse> {
  const URL = `${BASE_URL.AUTH}/anonymous/token?grant_type=client_credentials`;
  const token = btoa(
    [process.env.CLIENT_ID, process.env.CLIENT_SECRET].join(':')
  );
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    cache: 'no-cache',
  });
  const data = await response.json();
  return data;
}
