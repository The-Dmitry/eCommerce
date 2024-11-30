import Link from 'next/link';
import { BsCart2 } from 'react-icons/bs';
import { Routes } from '../shared/constants/routes';
import { fetchCartData } from '../shared/utils/api/cart/fetch-cart-data';

export default async function CartButton() {
  const data = await fetchCartData();
  let count = 0;
  if (data && 'lineItems' in data) {
    count = data.lineItems.length;
  }

  return (
    <Link href={Routes.CART}>
      <BsCart2 className='text-3xl' />
      <span>{count}</span>
    </Link>
  );
}
