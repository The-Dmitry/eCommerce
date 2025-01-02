'use client';

import removeProductFromCart from '@shared/utils/api/cart/remove-product-from-cart';
import { IoMdClose } from 'react-icons/io';

interface Props {
  lineItemId: string;
  quantity?: number;
}

export default function CartRemoveButton({ lineItemId, quantity = 1 }: Props) {
  return (
    <IoMdClose
      title='Remove'
      className='flex shrink-0 cursor-pointer text-3xl text-orange-500 transition-all hover:text-white'
      onClick={() => removeProductFromCart({ lineItemId, quantity })}
    />
  );
}
