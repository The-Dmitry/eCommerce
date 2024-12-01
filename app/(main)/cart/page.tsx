import CartCard from '@/src/features/cart-card';
import { Routes } from '@/src/shared/constants/routes';
import { fetchCartData } from '@/src/shared/utils/api/cart/fetch-cart-data';
import convertToUsd from '@/src/shared/utils/convert-to-usd';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cart',
};

export default async function CartPage() {
  const data = await fetchCartData();
  if (!data || 'errors' in data || !data.lineItems.length) {
    return (
      <div className='flex h-full flex-col items-center justify-center gap-3'>
        <h2 className='text-2xl text-orange-500'>Cart is empty {':('}</h2>
        <Link
          href={Routes.CATALOG}
          className='rounded-md bg-orange-500 px-2 py-1 text-xl text-black transition-all hover:bg-orange-400'
        >
          Catalog
        </Link>
      </div>
    );
  }
  const { lineItems, totalPrice } = data;
  return (
    <div className='flex w-full flex-col gap-3 md:flex-row'>
      <ul className='grid grow grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-2'>
        {lineItems.map((v) => (
          <CartCard key={v.id} data={v} />
        ))}
      </ul>
      <aside className='w-full rounded-xl bg-neutral-900 p-2 sm:max-w-64'>
        <p>Total: {convertToUsd(totalPrice.centAmount)}</p>
      </aside>
    </div>
  );
}
