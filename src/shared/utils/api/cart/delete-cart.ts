'use server';

import { BASE_URL } from '@shared/constants/base-url';
import { COOKIES_DATA } from '@shared/constants/cookies-data';
import { CartData } from '@shared/models/CartData';
import fetchWithToken from '@shared/utils/api/fetch-with-token';
import { cookies } from 'next/headers';

export default async function deleteCart() {
  const version = cookies().get(COOKIES_DATA.CART_VERSION)?.value;
  const id = cookies().get(COOKIES_DATA.CART_ID)?.value;
  const result = await fetchWithToken<CartData>(
    `${BASE_URL.HOST}/me/carts/${id}?version=${version}`,
    {
      method: 'DELETE',
    }
  );
  if (!('errors' in result)) {
    cookies().delete(COOKIES_DATA.CART_VERSION);
    cookies().delete(COOKIES_DATA.CART_ID);
  }
}
