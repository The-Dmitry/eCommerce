import { Routes } from '@/src/shared/constants/routes';
import { fetchCartData } from '@/src/shared/utils/api/cart/fetch-cart-data';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { CiShoppingCart } from 'react-icons/ci';
import CartItemsCollector from './cart-items-collector';
import { COOKIES_DATA } from '@shared/constants/cookies-data';

export default async function CartButton() {
  const id = cookies().get(COOKIES_DATA.CART_ID)?.value;
  console.log(id);

  let count = 0;
  const items: string[] = [];
  const data = await fetchCartData();
  if (data && 'lineItems' in data) {
    count = data.lineItems.length;
    data.lineItems.forEach((v) => items.push(v.productId));
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
