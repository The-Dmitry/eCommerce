'use server';

import { BASE_URL } from '@/src/shared/constants/base-url';
import { CartData } from '@/src/shared/models/CartData';
import { ResponseError } from '@/src/shared/models/ResponseError';

export default async function fetchActiveCart(token?: string) {
  if (!token) return null;
  const response = await fetch(`${BASE_URL.HOST}/me/active-cart`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data: CartData | ResponseError = await response.json();
  return 'id' in data ? { id: data.id, version: data.version } : null;
}
