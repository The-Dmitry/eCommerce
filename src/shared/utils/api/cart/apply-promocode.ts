'use server';

import { BASE_URL } from '@shared/constants/base-url';
import { COOKIES_DATA } from '@shared/constants/cookies-data';
import { CartData } from '@shared/models/CartData';
import fetchWithToken from '@shared/utils/api/fetch-with-token';
import { cookies } from 'next/headers';

export default async function applyPromoCode(_: unknown, kek: FormData) {
  const value = kek.get('code')?.toString();

  if (!value) {
    return '';
  }
  const version = cookies().get(COOKIES_DATA.CART_VERSION)?.value;
  const id = cookies().get(COOKIES_DATA.CART_ID)?.value;
  const code = value.toUpperCase();
  const result = await fetchWithToken<CartData>(
    `${BASE_URL.HOST}/carts/${id}`,
    {
      method: 'POST',
      body: JSON.stringify({
        version: version ? +version : 1,
        actions: [
          {
            action: 'addDiscountCode',
            code,
          },
        ],
      }),
    }
  );

  if ('version' in result) {
    cookies().set(COOKIES_DATA.CART_VERSION, `${result.version}`);
    return '';
  }
  return result.message;
}
