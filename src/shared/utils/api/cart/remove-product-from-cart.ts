'use server';

import { COOKIES_DATA } from '@shared/constants/cookies-data';
import updateCart from '@shared/utils/api/cart/update-cart';
import { cookies } from 'next/headers';

export default async function removeProductFromCart({
  lineItemId,
  quantity = 1,
}: {
  lineItemId: string;
  quantity: number;
}) {
  const version = cookies().get(COOKIES_DATA.CART_VERSION)?.value;
  const body = JSON.stringify({
    version: version ? +version : 1,
    actions: [
      {
        action: 'removeLineItem',
        lineItemId: lineItemId,
        quantity,
      },
    ],
  });

  const result = await updateCart(body);

  return result;
}
