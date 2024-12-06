'use server';

import { cookies } from 'next/headers';
import { COOKIES_DATA } from '../../../constants/cookies-data';
import { CartData } from '../../../models/CartData';
import fetchWithToken from '../fetch-with-token';

export async function createCart() {
  const result = await fetchWithToken<CartData>(
    `${process.env.HOST_URL}/${process.env.PROJECT_KEY}/me/carts`,
    {
      method: 'POST',
      body: JSON.stringify({
        currency: 'USD',
      }),
    }
  );
  if (!('errors' in result)) {
    const { id, version } = result;
    cookies().set(COOKIES_DATA.CART_ID, id);
    cookies().set(COOKIES_DATA.CART_VERSION, `${version}`);
  }
  return result;
}
