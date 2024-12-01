import Link from 'next/link';

import { Routes } from '../shared/constants/routes';
import { LineItem } from '../shared/models/CartData';
import CartRemoveButton from '../shared/ui/cart-remove-button';
import convertToUsd from '../shared/utils/convert-to-usd';

interface Props {
  data: LineItem;
}

export default function CartCard({ data }: Props) {
  const { name, variant, id } = data;
  return (
    <li className='group relative flex gap-3 rounded-xl bg-neutral-900 p-2'>
      <img
        src={variant.images[0].url}
        alt={name['en-US']}
        className='aspect-[1/1.15] w-28 select-none rounded-xl object-cover duration-150 hover:transition-all group-hover:brightness-110'
      />
      <div className='flex grow flex-col justify-between gap-3'>
        <Link
          className='line-clamp-2 w-fit text-xl text-orange-500 transition-all hover:text-orange-400'
          href={`${Routes.CATALOG}/${data.productId}`}
          title={name['en-US']}
        >
          {name['en-US']}
        </Link>
        <p className='text-2xl'>
          {convertToUsd(variant.prices[0].value.centAmount)}
        </p>
      </div>
      <CartRemoveButton lineItemId={id} quantity={1} />
    </li>
  );
}
