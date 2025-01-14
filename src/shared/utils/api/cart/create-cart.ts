'use server';

import { BASE_URL } from '@/src/shared/constants/base-url';
import { cookies } from 'next/headers';
import { COOKIES_DATA } from '../../../constants/cookies-data';
import { CartData } from '../../../models/CartData';
import fetchWithToken from '../fetch-with-token';

export async function createCart() {
  const result = await fetchWithToken<CartData>(`${BASE_URL.HOST}/me/carts`, {
    method: 'POST',
    body: JSON.stringify({
      currency: 'USD',
    }),
  });
  if (!('errors' in result)) {
    const cartExpiration = new Date();
    cartExpiration.setTime(cartExpiration.getTime() + 60 * 60 * 24 * 30);
    const { id, version } = result;
    cookies().set(COOKIES_DATA.CART_ID, id, {
      maxAge: 60 * 60 * 24 * 30,
      expires: cartExpiration,
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    });
    cookies().set(COOKIES_DATA.CART_VERSION, `${version}`, {
      maxAge: 60 * 60 * 24 * 30,
      expires: cartExpiration,
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    });
  }
  return result;
}
