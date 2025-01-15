'use server';

import fetchActiveCart from '@shared/utils/api/cart/fetch-active-cart';
import { NextResponse } from 'next/server';

export default async function initializeCart(
  token: string,
  response: NextResponse
) {
  const active_cart = await fetchActiveCart(token);
  return active_cart ? active_cart.id : null;
}
