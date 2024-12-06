'use server';

import { CartData } from '@/src/shared/models/CartData';
import { ResponseError } from '@/src/shared/models/ResponseError';

export default async function fetchActiveCart(token: string) {
  const response = await fetch(
    `${process.env.HOST_URL}/${process.env.PROJECT_KEY}/me/active-cart`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data: CartData | ResponseError = await response.json();
  return 'id' in data ? { id: data.id, version: data.version } : null;
}
