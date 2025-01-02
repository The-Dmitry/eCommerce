import { Routes } from '@/src/shared/constants/routes';
import { fetchCartData } from '@/src/shared/utils/api/cart/fetch-cart-data';
import { COOKIES_DATA } from '@shared/constants/cookies-data';
import getDataFromStorage from '@shared/utils/get-data-from-storage';
import Link from 'next/link';
import { CiShoppingCart } from 'react-icons/ci';
import CartItemsCollector from './cart-items-collector';

export default async function CartButton() {
  const token = getDataFromStorage(COOKIES_DATA.ACCESS_TOKEN);
  let count = 0;
  const items: string[] = [];
  if (token) {
    const data = await fetchCartData();
    if (data && 'lineItems' in data) {
      count = data.lineItems.length;
      data.lineItems.forEach((v) => items.push(v.productId));
    }
  }

  return (
    <Link href={Routes.CART} title='Cart' className='relative'>
      <CiShoppingCart className='-ml-1 text-5xl' />
      <span className='absolute inset-0 flex size-full items-center justify-center'>
        {count ? count : ''}
      </span>
      <CartItemsCollector data={items} />
    </Link>
  );
}
