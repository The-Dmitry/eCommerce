'use server';

import { COOKIES_DATA } from '@/src/shared/constants/cookies-data';
import { CartData } from '@/src/shared/models/CartData';
import { cookies } from 'next/headers';
import fetchWithToken from '../fetch-with-token';
import { createCart } from './create-cart';

export default async function updateCart(body: string, count: number = 0) {
  let cartId = cookies().get(COOKIES_DATA.CART_ID)?.value;

  if (!cartId) {
    const newCart = await createCart();

    if ('id' in newCart) {
      cartId = newCart.id;
    }
  }

  const result = await fetchWithToken<CartData>(
    `${process.env.HOST_URL}/${process.env.PROJECT_KEY}/me/carts/${cartId}`,
    {
      method: 'POST',
      body,
    }
  );

  if ('errors' in result) {
    if (!count) {
      await createCart();
      return await updateCart(body, count + 1);
    }
    throw new Error(`Updating cart is failed: ${result.message}`);
  }

  const { version } = result;
  cookies().set(COOKIES_DATA.CART_VERSION, `${version}`);

  return result;
}
