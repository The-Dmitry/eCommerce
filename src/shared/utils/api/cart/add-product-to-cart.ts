'use server';

import { COOKIES_DATA } from '@shared/constants/cookies-data';
import NewCartItemData from '@shared/models/new-cart-item-data';
import updateCart from '@shared/utils/api/cart/update-cart';
import { cookies } from 'next/headers';

export default async function addProductToCart({
  productId,
  variantId,
  quantity = 1,
}: NewCartItemData) {
  const version = cookies().get(COOKIES_DATA.CART_VERSION)?.value;
  const body = JSON.stringify({
    version: version ? +version : 1,
    actions: [
      {
        action: 'addLineItem',
        productId: productId,
        variantId: variantId,
        quantity: quantity,
      },
    ],
  });

  const result = await updateCart(body);

  return result;
}
