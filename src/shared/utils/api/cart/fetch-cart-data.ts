'use server';

import { BASE_URL } from '@/src/shared/constants/base-url';
import { COOKIES_DATA } from '@/src/shared/constants/cookies-data';
import { CartData } from '@/src/shared/models/CartData';
import fetchActiveCart from '@shared/utils/api/cart/fetch-active-cart';
import { cookies } from 'next/headers';
import fetchWithToken from '../fetch-with-token';

export async function fetchCartData() {
  let id = cookies().get(COOKIES_DATA.CART_ID)?.value;
  if (!id) {
    const token = cookies().get(COOKIES_DATA.ACCESS_TOKEN)?.value;
    const activeCart = await fetchActiveCart(token);
    id = activeCart ? activeCart.id : '';
  }
  if (id) {
    const result = await fetchWithToken<CartData>(
      `${BASE_URL.HOST}/carts/${id}`
    );
    return result;
  }
  return null;
}
