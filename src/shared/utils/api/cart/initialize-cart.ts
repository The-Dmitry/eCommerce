'use server';

import { COOKIES_DATA } from '@shared/constants/cookies-data';
import fetchActiveCart from '@shared/utils/api/cart/fetch-active-cart';
import { NextResponse } from 'next/server';

export default async function initializeCart(
  token: string,
  response: NextResponse
) {
  const active_cart = await fetchActiveCart(token);
  if (active_cart) {
    response.cookies.set(COOKIES_DATA.CART_ID, active_cart.id);
    response.cookies.set(COOKIES_DATA.CART_VERSION, `${active_cart.version}`);
  }
  return response;
}
