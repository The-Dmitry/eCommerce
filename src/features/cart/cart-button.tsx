import { Routes } from '@/src/shared/constants/routes';
import { fetchCartData } from '@/src/shared/utils/api/cart/fetch-cart-data';
import Link from 'next/link';
import { CiShoppingCart } from 'react-icons/ci';

export default async function CartButton() {
  const data = await fetchCartData();
  let count = 0;
  if (data && 'lineItems' in data) {
    count = data.lineItems.length;
  }

  return (
    <Link href={Routes.CART} className='relative'>
      <CiShoppingCart className='-ml-1 text-5xl' />
      <span className='absolute inset-0 flex size-full items-center justify-center'>
        {count ? count : ''}
      </span>
    </Link>
  );
}
